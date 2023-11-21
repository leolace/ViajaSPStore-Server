"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataSource_1 = __importDefault(require("../dataSource"));
const customer_1 = __importDefault(require("../entities/customer"));
const customerRepository = dataSource_1.default.getRepository(customer_1.default);
exports.default = customerRepository;
//# sourceMappingURL=customerRepository.js.map