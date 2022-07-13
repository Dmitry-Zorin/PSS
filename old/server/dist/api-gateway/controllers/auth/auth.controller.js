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
const microservices_1 = require("@nestjs/microservices");
const constants_1 = require("../../constants");
const jwt_guard_1 = require("../../jwt/jwt.guard");
const user_decorator_1 = require("./user.decorator");
let AuthController = class AuthController {
    client;
    constructor(client) {
        this.client = client;
    }
    register(username, password) {
        return this.client.send('register', { username, password });
    }
    login(username, password) {
        return this.client.send('login', { username, password });
    }
    async updateSettings({ id }, body) {
        const data = { id, payload: body };
        return this.client.send('settings', data);
    }
    getPermissions(user) {
        return { role: user.role };
    }
    findIdentity({ id }) {
        return this.client.send('identity', { id });
    }
    unregister({ id }) {
        return this.client.send('unregister', { id });
    }
};
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)('username')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)('username')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Put)('settings'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateSettings", null);
__decorate([
    (0, common_1.Get)('permissions'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getPermissions", null);
__decorate([
    (0, common_1.Get)('identity'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "findIdentity", null);
__decorate([
    (0, common_1.Delete)('unregister'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "unregister", null);
AuthController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)(constants_1.AUTH_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map