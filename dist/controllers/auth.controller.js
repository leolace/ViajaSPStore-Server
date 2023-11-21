"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRepository_1 = __importDefault(require("../repositories/authRepository"));
const customerRepository_1 = __importDefault(require("../repositories/customerRepository"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendEmail_1 = __importDefault(require("../helpers/sendEmail"));
class AuthController {
    async auth(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ error: "E-mail e senha são obrigatórios para fazer login" });
        }
        const user = await customerRepository_1.default.findOne({ where: { email } });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Email ou senha incorretos" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        return res.json({ token });
    }
    async me(req, res) {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ error: "Não autorizado" });
        }
        const [, token] = authorization.split(" ");
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err || !decoded || typeof decoded === "string" || !decoded.id) {
                return res.status(401).json({ error: "Não autorizado" });
            }
            const user = await customerRepository_1.default.findOneBy({ id: decoded.id });
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado" });
            }
            return res.json(user);
        });
    }
    async sendVerifyEmail(req, res) {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "E-mail é obrigatório" });
        }
        const user = await customerRepository_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        if (user.verified) {
            return res.status(400).json({ error: "E-mail já verificado" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        const auth = authRepository_1.default.create({
            userId: user.id,
            token
        });
        await authRepository_1.default.save(auth);
        const clientURL = process.env.CLIENT_URL;
        await (0, sendEmail_1.default)(user.email, clientURL, token, user.id);
        return res.sendStatus(200);
    }
    async verify(req, res) {
        const { id, token } = req.query;
        if (!id || !token) {
            return res
                .status(400)
                .json({ error: "Dados insuficientes para verificar o email" });
        }
        const customer = await customerRepository_1.default.findOneBy({ id: id });
        if (!customer) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        if (customer.verified) {
            return res.status(409).json({ error: "E-mail já verificado" });
        }
        const auth = await authRepository_1.default.findOneBy({
            userId: id,
            token: token
        });
        if (!auth) {
            return res.status(404).send("Não foi possível verificar o email");
        }
        await customerRepository_1.default.update(customer.id, { verified: true });
        await authRepository_1.default.delete(auth.userId);
        return res.sendStatus(200);
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.controller.js.map