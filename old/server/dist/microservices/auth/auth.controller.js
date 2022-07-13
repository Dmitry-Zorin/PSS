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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const microservices_1 = require("@nestjs/microservices");
const auth_service_1 = require("./auth.service");
const constants_1 = require("./constants");
const dto_1 = require("./dto");
const params_1 = require("./dto/params");
const http_exception_filter_1 = require("./http-exception.filter");
let AuthController = class AuthController {
    authService;
    jwtService;
    constructor(authService, jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }
    async register({ username, password }) {
        const user = await this.authService.createUser(username, password);
        return { token: this.jwtService.sign(user) };
    }
    async login({ username, password }) {
        const user = await this.authService.findUser({ username }, { passwordToVerify: password });
        return { token: this.jwtService.sign(user) };
    }
    async updateSettings({ id }, settings) {
        await this.authService.updateSettings(id, settings);
        return constants_1.DEFAULT_SUCCESS_RESPONSE;
    }
    getIdentity({ id }) {
        return this.authService.findUser({ id });
    }
    async unregister({ id }) {
        await this.authService.removeUser(id);
        return constants_1.DEFAULT_SUCCESS_RESPONSE;
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, microservices_1.MessagePattern)('login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, microservices_1.MessagePattern)('settings'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Payload)('payload')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_1.IdParamDto,
        dto_1.SettingsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateSettings", null);
__decorate([
    (0, microservices_1.MessagePattern)('identity'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_1.IdParamDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getIdentity", null);
__decorate([
    (0, microservices_1.MessagePattern)('unregister'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_1.IdParamDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "unregister", null);
AuthController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_1.JwtService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map