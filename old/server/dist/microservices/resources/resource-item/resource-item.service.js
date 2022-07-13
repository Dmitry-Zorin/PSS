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
exports.ResourceItemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const typeorm_2 = require("typeorm");
const constants_1 = require("../constants");
const entities_1 = require("../entities");
let ResourceItemService = class ResourceItemService {
    entityManager;
    logger = new common_1.Logger('AuthService');
    constructor(entityManager) {
        this.entityManager = entityManager;
    }
    async create(resource, payload) {
        const { publication, ...resourceItem } = payload;
        const [resourceInfo] = await this.entityManager.findBy(entities_1.Resource, {
            name: resource,
        });
        if (!resourceInfo) {
            throw new common_1.NotFoundException(`Resource ${resource} does not exist`);
        }
        return this.entityManager.transaction(async (manager) => {
            resourceItem.resource = resource;
            const { id } = await manager.save(entities_1.ResourceItem, resourceItem);
            if (resourceInfo?.category) {
                if (!publication) {
                    throw new common_1.BadRequestException('Parameter publication.authorIds is required');
                }
                publication.resourceItemId = id;
                publication.title = resourceItem.title;
                try {
                    await manager.insert(entities_1.Publication, publication);
                }
                catch (e) {
                    this.logger.error(e, e?.stack);
                    throw new common_1.BadRequestException('Publication has invalid format');
                }
                await manager
                    .createQueryBuilder()
                    .relation(entities_1.Publication, 'authors')
                    .of(id)
                    .add(publication.authorIds);
            }
            return { id };
        });
    }
    async update(resource, id, payload) {
        const { publication = {}, ...resourceItemUpdate } = payload;
        await this.entityManager.transaction(async (manager) => {
            try {
                await manager.update(entities_1.ResourceItem, id, resourceItemUpdate);
            }
            catch (e) {
                this.logger.error(e, e?.stack);
                throw new common_1.BadRequestException('Resource item has invalid format');
            }
            if (publication.authorIds) {
                const relationQueryBuilder = manager
                    .createQueryBuilder()
                    .relation(entities_1.Publication, 'authors')
                    .of(id);
                const prevAuthors = await relationQueryBuilder.loadMany();
                const prevAuthorIds = prevAuthors.map((e) => e.id);
                await relationQueryBuilder.addAndRemove((0, lodash_1.difference)(publication.authorIds, prevAuthorIds), (0, lodash_1.difference)(prevAuthorIds, publication.authorIds));
                delete publication.authorIds;
            }
            if (resourceItemUpdate.title) {
                publication.title = resourceItemUpdate.title;
            }
            if (!(0, lodash_1.isEmpty)(publication)) {
                try {
                    await manager.update(entities_1.Publication, id, publication);
                }
                catch (e) {
                    this.logger.error(e, e?.stack);
                    throw new common_1.BadRequestException('Publication has invalid format');
                }
            }
        });
    }
    getFindOptions(resource, searchParams) {
        return {
            where: {
                ...searchParams.filter,
                resource,
            },
            relations: {
                publication: true,
            },
        };
    }
    async remove(resource, ids) {
        await this.entityManager.transaction(async (manager) => {
            await manager.delete(entities_1.Publication, ids);
            await manager.delete(entities_1.ResourceItem, ids);
        });
    }
};
ResourceItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectEntityManager)(constants_1.CONNECTION_NAME)),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], ResourceItemService);
exports.ResourceItemService = ResourceItemService;
//# sourceMappingURL=resource-item.service.js.map