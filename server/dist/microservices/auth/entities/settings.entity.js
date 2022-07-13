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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const user_entity_1 = require("./user.entity");
let Settings = class Settings {
    user;
    userId;
    locale;
    theme;
};
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (e) => e.settings),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Settings.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Settings.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.Locale, default: enums_1.Locale.En }),
    __metadata("design:type", String)
], Settings.prototype, "locale", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.Theme, default: enums_1.Theme.Light }),
    __metadata("design:type", String)
], Settings.prototype, "theme", void 0);
Settings = __decorate([
    (0, typeorm_1.Entity)('settings')
], Settings);
exports.Settings = Settings;
//# sourceMappingURL=settings.entity.js.map