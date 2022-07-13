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
var OtherResourcesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherResourcesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const constants_1 = require("../constants");
const entities_1 = require("../entities");
let OtherResourcesService = OtherResourcesService_1 = class OtherResourcesService {
    entityManager;
    static availableEntities = {
        authors: entities_1.Author,
        characters: entities_1.Character,
    };
    constructor(entityManager) {
        this.entityManager = entityManager;
    }
    static getEntityClass(resource) {
        return OtherResourcesService_1.availableEntities[resource];
    }
    async create(resource, payload) {
        const entityClass = OtherResourcesService_1.getEntityClass(resource);
        const createResult = await this.entityManager.insert(entityClass, payload);
        return {
            id: createResult.identifiers[0],
            ...payload,
        };
    }
    async update(resource, id, payload) {
        const entityClass = OtherResourcesService_1.getEntityClass(resource);
        const [entity] = await this.entityManager.find(entityClass, {
            where: { id },
        });
        if (!entity) {
            throw new common_1.NotFoundException();
        }
        await this.entityManager.update(entityClass, this.entityManager.getId(entity), payload);
        return null;
    }
    getFindOptions() {
        return {};
    }
    async remove(resource, ids) {
        const entityClass = OtherResourcesService_1.getEntityClass(resource);
        await this.entityManager.delete(entityClass, ids);
    }
};
OtherResourcesService = OtherResourcesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectEntityManager)(constants_1.CONNECTION_NAME)),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], OtherResourcesService);
exports.OtherResourcesService = OtherResourcesService;
//# sourceMappingURL=otherResources.service.js.map