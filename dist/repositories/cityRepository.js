"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = __importDefault(require("../dataSource"));
const city_1 = __importDefault(require("../entities/city"));
const cityRepository = dataSource_1.default.getRepository(city_1.default);
exports.default = cityRepository;
//# sourceMappingURL=cityRepository.js.map