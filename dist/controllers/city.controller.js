"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryRepository_1 = __importDefault(require("../repositories/categoryRepository"));
const cityRepository_1 = __importDefault(require("../repositories/cityRepository"));
const typeorm_1 = require("typeorm");
class CityController {
    async index(req, res) {
        const cities = await cityRepository_1.default.find();
        return res.json(cities);
    }
    async show(req, res) {
        const { id } = req.params;
        const city = await cityRepository_1.default.findOne({
            where: { id },
            relations: ["categories", "tripPackages"]
        });
        if (!city) {
            return res.status(404).json({ error: "Cidade não encontrada" });
        }
        return res.json(city);
    }
    async store(req, res) {
        const { name, state, attractions, about, categories_id, imagesUrl } = req.body;
        const categories = await categoryRepository_1.default.find({
            where: { id: (0, typeorm_1.Any)(categories_id) }
        });
        const city = cityRepository_1.default.create({
            name,
            state,
            attractions,
            about,
            categories,
            images: imagesUrl.length > 0 ? imagesUrl : []
        });
        await cityRepository_1.default.save(city);
        return res.json(city);
    }
    async update(req, res) {
        const { id } = req.params;
        const { name, state, attractions, about, categories_id, imagesUrl } = req.body;
        const categories = await categoryRepository_1.default.find({
            where: { id: (0, typeorm_1.Any)(categories_id) }
        });
        console.log(categories);
        const city = await cityRepository_1.default.findOne({
            where: { id },
            relations: ["categories", "tripPackages"]
        });
        if (!city) {
            return res.status(404).json({ error: "Cidade não encontrada" });
        }
        const data = Object.assign(Object.assign({}, city), { name: name || city.name, state: state || city.state, attractions: attractions || city.attractions, about: about || city.about, categories: categories.length > 0 ? categories : city.categories, images: imagesUrl || city.images });
        const updatedCity = await cityRepository_1.default.preload(Object.assign(Object.assign({}, data), { id }));
        if (!updatedCity)
            return res.status(404).json({ error: "Cidade não encontrada" });
        cityRepository_1.default.save(updatedCity);
        return res.json(updatedCity);
    }
}
exports.default = new CityController();
//# sourceMappingURL=city.controller.js.map