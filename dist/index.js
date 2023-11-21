"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const dataSource_1 = __importDefault(require("./dataSource"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dataSource_1.default.initialize().then(() => {
    app.use((0, cors_1.default)({ origin: "*" }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(routes_1.default);
    app.listen(3000, () => {
        console.log(`🔥 Server is running on http://localhost:${3000}`);
    });
});
//# sourceMappingURL=index.js.map