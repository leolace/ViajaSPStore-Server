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
const city_1 = __importDefault(require("./city"));
const accommodation_1 = __importDefault(require("./accommodation"));
const category_1 = __importDefault(require("./category"));
let TripPackage = class TripPackage {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], TripPackage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => city_1.default, (city) => city.tripPackages),
    __metadata("design:type", city_1.default)
], TripPackage.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], TripPackage.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], TripPackage.prototype, "transport", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => accommodation_1.default, (accommodation) => accommodation.tripPackages, { nullable: true }),
    __metadata("design:type", accommodation_1.default)
], TripPackage.prototype, "accommodation", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => category_1.default, (category) => category.tripPackages),
    __metadata("design:type", Array)
], TripPackage.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], TripPackage.prototype, "departureDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], TripPackage.prototype, "returnDate", void 0);
TripPackage = __decorate([
    (0, typeorm_1.Entity)("tripPackages")
], TripPackage);
exports.default = TripPackage;
//# sourceMappingURL=tripPackage.js.map