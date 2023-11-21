"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const tripPackage_1 = __importDefault(require("./tripPackage"));
const city_1 = __importDefault(require("./city"));
let Category = class Category {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tripPackage_1.default, (tripPackage) => tripPackage.categories),
    (0, typeorm_1.JoinTable)({
        name: "trip_packages_categories",
        joinColumn: { name: "category_id", referencedColumnName: "id" },
        inverseJoinColumn: {
            name: "trip_package_id",
            referencedColumnName: "id"
        }
    }),
    __metadata("design:type", Array)
], Category.prototype, "tripPackages", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => city_1.default, (city) => city.categories),
    (0, typeorm_1.JoinTable)({
        name: "cities_categories",
        joinColumn: { name: "category_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "city_id", referencedColumnName: "id" }
    }),
    __metadata("design:type", Array)
], Category.prototype, "cities", void 0);
Category = __decorate([
    (0, typeorm_1.Entity)("categories")
], Category);
exports.default = Category;
//# sourceMappingURL=category.js.map