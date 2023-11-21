"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = __importDefault(require("../dataSource"));
const tripPackage_1 = __importDefault(require("../entities/tripPackage"));
const tripPackageRepository = dataSource_1.default.getRepository(tripPackage_1.default);
exports.default = tripPackageRepository;
//# sourceMappingURL=tripPackageRepository.js.map