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
exports.ResourceItem = void 0;
const typeorm_1 = require("typeorm");
const publication_entity_1 = require("./publication.entity");
let ResourceItem = class ResourceItem {
    id;
    createdAt;
    updatedAt;
    resource;
    title;
    description;
    publication;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ResourceItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ResourceItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ResourceItem.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ResourceItem.prototype, "resource", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ResourceItem.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ResourceItem.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => publication_entity_1.Publication, (e) => e.resourceItem),
    __metadata("design:type", publication_entity_1.Publication)
], ResourceItem.prototype, "publication", void 0);
ResourceItem = __decorate([
    (0, typeorm_1.Entity)('resource_item')
], ResourceItem);
exports.ResourceItem = ResourceItem;
//# sourceMappingURL=resource-item.entity.js.map