"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = __importDefault(require("../dataSource"));
const accommodation_1 = __importDefault(require("../entities/accommodation"));
const accommodationRepository = dataSource_1.default.getRepository(accommodation_1.default);
exports.default = accommodationRepository;
//# sourceMappingURL=accommodationRepository.js.map