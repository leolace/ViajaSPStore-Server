"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryRepository_1 = __importDefault(require("../repositories/categoryRepository"));
class CategoryController {
    async index(req, res) {
        const categories = await categoryRepository_1.default.find();
        return res.json(categories);
    }
    async store(req, res) {
        const { name } = req.body;
        const category = categoryRepository_1.default.create({ name });
        await categoryRepository_1.default.save(category);
        return res.json(category);
    }
    async show(req, res) {
        const { id } = req.params;
        const category = await categoryRepository_1.default.findOne({
            where: { id },
            relations: ["cities", "tripPackages"]
        });
        return res.json(category);
    }
}
exports.default = new CategoryController();
//# sourceMappingURL=category.controller.js.map