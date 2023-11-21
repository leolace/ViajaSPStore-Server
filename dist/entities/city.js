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
const category_1 = __importDefault(require("./category"));
let City = class City {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], City.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], City.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "char", length: 2, default: "SP" }),
    __metadata("design:type", String)
], City.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", array: true, nullable: true }),
    __metadata("design:type", Array)
], City.prototype, "attractions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], City.prototype, "about", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true, array: true }),
    __metadata("design:type", Array)
], City.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tripPackage_1.default, (tripPackage) => tripPackage.city, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Array)
], City.prototype, "tripPackages", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => category_1.default, (category) => category.cities, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)({ name: "category_id", referencedColumnName: "id" }),
    __metadata("design:type", Array)
], City.prototype, "categories", void 0);
City = __decorate([
    (0, typeorm_1.Entity)("cities")
], City);
exports.default = City;
//# sourceMappingURL=city.js.map