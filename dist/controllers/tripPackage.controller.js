"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accommodationRepository_1 = __importDefault(require("../repositories/accommodationRepository"));
const categoryRepository_1 = __importDefault(require("../repositories/categoryRepository"));
const cityRepository_1 = __importDefault(require("../repositories/cityRepository"));
const tripPackageRepository_1 = __importDefault(require("../repositories/tripPackageRepository"));
const typeorm_1 = require("typeorm");
class TripPackageController {
    async index(req, res) {
        const tripPackages = await tripPackageRepository_1.default.find({
            relations: ["city", "categories"]
        });
        return res.json(tripPackages);
    }
    async show(req, res) {
        const { id } = req.params;
        const tripPackage = await tripPackageRepository_1.default.findOne({
            where: { id },
            relations: ["city", "categories", "accommodation"]
        });
        if (!tripPackage) {
            return res.status(404).json({ error: "Pacote não encontrado" });
        }
        return res.json(tripPackage);
    }
    async store(req, res) {
        const { price, categories_id, city_id, transport, departureDate, returnDate, accommodation_id } = req.body;
        const categories = await categoryRepository_1.default.find({
            where: { id: (0, typeorm_1.Any)(categories_id) }
        });
        const city = await cityRepository_1.default.findOne({ where: { id: city_id } });
        if (!city) {
            return res.status(404).json({ error: "Cidade não encontrada" });
        }
        const accommodation = await accommodationRepository_1.default.findOne({
            where: { id: accommodation_id }
        });
        if (!accommodation) {
            return res.status(404).json({ error: "Acomodação não encontrada" });
        }
        const tripPackage = tripPackageRepository_1.default.create({
            city,
            price,
            categories,
            transport,
            accommodation,
            returnDate,
            departureDate
        });
        await tripPackageRepository_1.default.save(tripPackage);
        return res.json(tripPackage);
    }
}
exports.default = new TripPackageController();
//# sourceMappingURL=tripPackage.controller.js.map