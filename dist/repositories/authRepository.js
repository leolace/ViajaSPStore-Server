"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = __importDefault(require("../dataSource"));
const auth_1 = __importDefault(require("../entities/auth"));
const authRepository = dataSource_1.default.getRepository(auth_1.default);
exports.default = authRepository;
//# sourceMappingURL=authRepository.js.map