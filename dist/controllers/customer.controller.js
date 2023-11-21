"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmail_1 = __importDefault(require("../helpers/sendEmail"));
const authRepository_1 = __importDefault(require("../repositories/authRepository"));
const customerRepository_1 = __importDefault(require("../repositories/customerRepository"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class CustomerController {
    async index(req, res) {
        const { email } = req.query;
        let customers;
        if (email) {
            customers = await customerRepository_1.default.findOne({
                where: { email: String(email) }
            });
        }
        else {
            customers = await customerRepository_1.default.find();
        }
        res.json(customers);
    }
    async store(req, res) {
        const { name, email, password } = req.body;
        const customerExists = await customerRepository_1.default.findOne({
            where: { email }
        });
        if (customerExists) {
            return res.status(409).json({ error: "E-mail já cadastrado" });
        }
        const customer = customerRepository_1.default.create({
            name,
            email,
            password
        });
        await customerRepository_1.default.save(customer);
        const token = jsonwebtoken_1.default.sign({ id: customer.id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        const auth = authRepository_1.default.create({
            userId: customer.id,
            token
        });
        await authRepository_1.default.save(auth);
        const clientURL = process.env.CLIENT_URL;
        await (0, sendEmail_1.default)(customer.email, clientURL, token, customer.id);
        return res.status(201).json({ token });
    }
}
exports.default = new CustomerController();
//# sourceMappingURL=customer.controller.js.map