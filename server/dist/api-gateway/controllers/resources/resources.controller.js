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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const constants_1 = require("../../constants");
const jwt_guard_1 = require("../../jwt/jwt.guard");
const roles_guard_1 = require("../../roles.guard");
const form_data_1 = __importDefault(require("form-data"));
const lodash_1 = require("lodash");
const rxjs_1 = require("rxjs");
let ResourcesController = class ResourcesController {
    client;
    constructor(client) {
        this.client = client;
    }
    getCount() {
        return this.client.send('count', {});
    }
    getCategories() {
        return this.client.send('categories', {});
    }
    getAuthorPublications(query) {
        return this.client.send('publications', { query });
    }
    async create(resource, body) {
        if ((0, lodash_1.isEmpty)(body)) {
            throw new common_1.BadRequestException('Request body is missing');
        }
        const result = await (0, rxjs_1.firstValueFrom)(this.client.send('create', { resource, payload: body }));
        const data = new form_data_1.default();
        return result;
    }
    async update(resource, id, body) {
        if ((0, lodash_1.isEmpty)(body)) {
            throw new common_1.BadRequestException('Request body is missing');
        }
        const result = await (0, rxjs_1.firstValueFrom)(this.client.send('update', { resource, id, payload: body }));
        const data = new form_data_1.default();
        return result;
    }
    async find(resource, query, res) {
        const { range, records } = await (0, rxjs_1.firstValueFrom)(this.client.send('find', { resource, query }));
        if (range) {
            res.header('Content-Range', range);
        }
        return records;
    }
    findOne(resource, id) {
        return this.client.send('find_one', { resource, id });
    }
    async remove(resource, ids) {
        return this.client.send('remove', { resource, ids });
    }
    removeOne(resource, id) {
        return this.client.send('remove_one', { resource, id });
    }
};
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)('count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResourcesController.prototype, "getCount", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResourcesController.prototype, "getCategories", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)('publications'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ResourcesController.prototype, "getAuthorPublications", null);
__decorate([
    (0, roles_guard_1.Admin)(),
    (0, common_1.Post)(':resource'),
    __param(0, (0, common_1.Param)('resource')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "create", null);
__decorate([
    (0, roles_guard_1.Admin)(),
    (0, common_1.Put)(':resource/:id'),
    __param(0, (0, common_1.Param)('resource')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "update", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)(':resource'),
    __param(0, (0, common_1.Param)('resource')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "find", null);
__decorate([
    (0, jwt_guard_1.Public)(),
    (0, common_1.Get)(':resource/:id'),
    __param(0, (0, common_1.Param)('resource')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ResourcesController.prototype, "findOne", null);
__decorate([
    (0, roles_guard_1.Admin)(),
    (0, common_1.Delete)(':resource'),
    __param(0, (0, common_1.Param)('resource')),
    __param(1, (0, common_1.Query)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "remove", null);
__decorate([
    (0, roles_guard_1.Admin)(),
    (0, common_1.Delete)(':resource/:id'),
    __param(0, (0, common_1.Param)('resource')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ResourcesController.prototype, "removeOne", null);
ResourcesController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)(constants_1.RESOURCES_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], ResourcesController);
exports.ResourcesController = ResourcesController;
//# sourceMappingURL=resources.controller.js.map