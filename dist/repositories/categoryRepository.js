"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = __importDefault(require("../dataSource"));
const category_1 = __importDefault(require("../entities/category"));
const categoryRepository = dataSource_1.default.getRepository(category_1.default);
exports.default = categoryRepository;
//# sourceMappingURL=categoryRepository.js.map