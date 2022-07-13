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
var ResourcesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const constants_1 = require("./constants");
const entities_1 = require("./entities");
const other_resources_service_1 = require("./other-resources/other-resources.service");
const resource_item_service_1 = require("./resource-item/resource-item.service");
const utilities_1 = require("./utilities");
let ResourcesService = ResourcesService_1 = class ResourcesService {
    entityManager;
    resourceItemService;
    otherResourcesService;
    logger = new common_1.Logger('ResourcesService');
    constructor(entityManager, resourceItemService, otherResourcesService) {
        this.entityManager = entityManager;
        this.resourceItemService = resourceItemService;
        this.otherResourcesService = otherResourcesService;
    }
    static getEntityClass(resource) {
        if (resource in other_resources_service_1.OtherResourcesService.availableEntities) {
            return other_resources_service_1.OtherResourcesService.getEntityClass(resource);
        }
        return entities_1.ResourceItem;
    }
    getResourceService(resource) {
        if (resource in other_resources_service_1.OtherResourcesService.availableEntities) {
            return this.otherResourcesService;
        }
        return this.resourceItemService;
    }
    async getCount() {
        const resourceItems = await this.entityManager
            .createQueryBuilder(entities_1.ResourceItem, 'item')
            .select('item.resource', 'resource')
            .addSelect('count(*)', 'count')
            .groupBy('item.resource')
            .cache(constants_1.DEFAULT_CACHE_TIME)
            .getRawMany();
        return resourceItems.reduce((res, e) => {
            res[e.resource] = +e.count;
            return res;
        }, {});
    }
    async getCategories() {
        const categories = await this.entityManager
            .createQueryBuilder(entities_1.Resource, 'resource')
            .select('resource.category', 'category')
            .addSelect('array_agg(resource.name)', 'resources')
            .groupBy('resource.category')
            .cache(10 * constants_1.DEFAULT_CACHE_TIME)
            .getRawMany();
        return categories.reduce((res, e) => {
            res[e.category] = e.resources;
            return res;
        }, {});
    }
    async getPublications(filter) {
        const publications = await this.entityManager.find(entities_1.Publication, {
            where: filter,
        });
        if (!publications.length) {
            throw new common_1.NotFoundException('Author with the provided ID does not have any publications');
        }
        return publications;
    }
    create(resource, payload) {
        return this.getResourceService(resource).create(resource, payload);
    }
    update(resource, id, payload) {
        return this.getResourceService(resource).update(resource, id, payload);
    }
    async find(resource, searchParams, options = {}) {
        const { filter, sort, skip, take } = searchParams;
        const findOptions = {
            skip,
            take,
            cache: constants_1.DEFAULT_CACHE_TIME,
        };
        if (resource === 'timeline') {
            findOptions.order = { createdAt: 'desc' };
        }
        else {
            findOptions.where = filter;
            if (sort) {
                findOptions.order = {
                    [sort.field]: sort.order,
                };
            }
            const resourceService = this.getResourceService(resource);
            const additionalOptions = resourceService.getFindOptions(resource, searchParams);
            Object.assign(findOptions, additionalOptions);
        }
        const entityClass = ResourcesService_1.getEntityClass(resource);
        try {
            if (options.count) {
                const [records, total] = await this.entityManager.findAndCount(entityClass, findOptions);
                return {
                    records: (0, utilities_1.omitNullDeep)(records),
                    total,
                };
            }
            const records = await this.entityManager.find(entityClass, findOptions);
            return {
                records: (0, utilities_1.omitNullDeep)(records),
            };
        }
        catch (e) {
            if (e instanceof typeorm_2.EntityPropertyNotFoundError) {
                const property = e.message.match(/^Property "(\w+)"/)[1];
                throw new common_1.BadRequestException(`Invalid property ${property}`);
            }
            this.logger.error(e, e?.stack);
            throw new common_1.NotFoundException();
        }
    }
    findByIds(resource, ids) {
        return this.find(resource, {
            filter: {
                id: (0, typeorm_2.In)(ids),
            },
        });
    }
    async findOne(resource, id) {
        const { records } = await this.find(resource, {
            filter: { id },
        });
        if (!records.length) {
            throw new common_1.NotFoundException();
        }
        return records[0];
    }
    remove(resource, ids) {
        return this.getResourceService(resource).remove(resource, ids);
    }
};
ResourcesService = ResourcesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectEntityManager)(constants_1.CONNECTION_NAME)),
    __metadata("design:paramtypes", [typeorm_2.EntityManager,
        resource_item_service_1.ResourceItemService,
        other_resources_service_1.OtherResourcesService])
], ResourcesService);
exports.ResourcesService = ResourcesService;
//# sourceMappingURL=resources.service.js.map