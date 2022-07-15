"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("./jwt.strategy");
let JwtModule = class JwtModule {
};
JwtModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [jwt_strategy_1.JwtStrategy],
        exports: [jwt_strategy_1.JwtStrategy],
    })
], JwtModule);
exports.JwtModule = JwtModule;
//# sourceMappingURL=jwt.module.js.map