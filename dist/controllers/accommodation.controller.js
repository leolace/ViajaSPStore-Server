"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const accommodationRepository_1 = __importDefault(require("../repositories/accommodationRepository"));
const cityRepository_1 = __importDefault(require("../repositories/cityRepository"));
class AccommodationController {
    async index(req, res) {
        const accommodations = await accommodationRepository_1.default.find();
        return res.json(accommodations);
    }
    async show(req, res) {
        const { id } = req.params;
        const accommodation = await accommodationRepository_1.default.findOne({
            where: { id }
        });
        if (!accommodation) {
            return res.status(404).json({ error: "Acomodação não encontrada" });
        }
        return res.json(accommodation);
    }
    async store(req, res) {
        const { name, city_id, rooms, stars } = req.body;
        const city = await cityRepository_1.default.findOne({ where: { id: city_id } });
        if (!city) {
            return res.status(404).json({ error: "Cidade não encontrada" });
        }
        const accommodation = accommodationRepository_1.default.create({
            name,
            city,
            rooms,
            stars
        });
        await accommodationRepository_1.default.save(accommodation);
        return res.json(accommodation);
    }
}
exports.default = new AccommodationController();
//# sourceMappingURL=accommodation.controller.js.map