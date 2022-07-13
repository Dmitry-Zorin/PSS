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
exports.ResourcesController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const http_exception_filter_1 = require("../auth/http-exception.filter");
const params_1 = require("./dto/params");
const publications_query_dto_1 = require("./dto/params/publications-query.dto");
const payload_validation_pipe_1 = require("./payload-validation.pipe");
const resources_service_1 = require("./resources.service");
const utilities_1 = require("./utilities");
let ResourcesController = class ResourcesController {
    resourcesService;
    constructor(resourcesService) {
        this.resourcesService = resourcesService;
    }
    getCount() {
        return this.resourcesService.getCount();
    }
    getCategories() {
        return this.resourcesService.getCategories();
    }
    async getAuthorPublications({ authorId }) {
        const publications = await this.resourcesService.getPublications({
            authors: {
                id: authorId,
            },
        });
        return (0, utilities_1.omitNullDeep)(publications);
    }
    async create({ resource }, payload) {
        const created = await this.resourcesService.create(resource, payload);
        return (0, utilities_1.omitNullDeep)(created);
    }
    async update({ resource }, { id }, payload) {
        await this.resourcesService.update(resource, id, payload);
        return null;
    }
    async find({ resource }, query) {
        if (query.ids) {
            return await this.resourcesService.findByIds(resource, query.ids);
        }
        const { records, total } = await this.resourcesService.find(resource, query, { count: true });
        const { skip = 0, take = total } = query;
        return {
            records,
            range: `${resource} ${skip}-${Math.min(take, total)}/${total}`,
        };
    }
    async findOne({ resource }, { id }) {
        return this.resourcesService.findOne(resource, id);
    }
    async remove({ resource }, { ids }) {
        await this.resourcesService.remove(resource, ids);
        return null;
    }
    async removeOne({ resource }, { id }) {
        await this.resourcesService.remove(resource, [id]);
        return null;
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResourcesController.prototype, "getCount", null);
__decorate([
    (0, microservices_1.MessagePattern)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResourcesController.prototype, "getCategories", null);
__decorate([
    (0, microservices_1.MessagePattern)('publications'),
    __param(0, (0, microservices_1.Payload)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [publications_query_dto_1.PublicationsQueryDto]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "getAuthorPublications", null);
__decorate([
    (0, microservices_1.MessagePattern)('create'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Payload)(payload_validation_pipe_1.PayloadValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_1.ResourceParamDto,
        params_1.PayloadDto]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)('update'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Payload)()),
    __param(2, (0, microservices_1.Payload)(payload_validation_pipe_1.PayloadValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_1.ResourceParamDto,
        params_1.IdParamDto,
        params_1.PayloadDto]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('find'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Payload)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_1.ResourceParamDto,
        params_1.FindQueryDto]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "find", null);
__decorate([
    (0, microservices_1.MessagePattern)('find_one'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_1.ResourceParamDto,
        params_1.IdParamDto]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)('remove'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_1.ResourceParamDto,
        params_1.IdsParamDto]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "remove", null);
__decorate([
    (0, microservices_1.MessagePattern)('remove_one'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_1.ResourceParamDto,
        params_1.IdParamDto]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "removeOne", null);
ResourcesController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [resources_service_1.ResourcesService])
], ResourcesController);
exports.ResourcesController = ResourcesController;
//# sourceMappingURL=resources.controller.js.map