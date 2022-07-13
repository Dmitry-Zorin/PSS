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
exports.Publication = void 0;
const typeorm_1 = require("typeorm");
const author_entity_1 = require("./author.entity");
const resource_item_entity_1 = require("./resource-item.entity");
let Publication = class Publication {
    resourceItem;
    resourceItemId;
    title;
    type;
    characterId;
    publicationPlace;
    year;
    outputData;
    volume;
    authors;
    authorIds;
    coauthors;
};
__decorate([
    (0, typeorm_1.OneToOne)(() => resource_item_entity_1.ResourceItem, (e) => e.publication),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", resource_item_entity_1.ResourceItem)
], Publication.prototype, "resourceItem", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Publication.prototype, "resourceItemId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Publication.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Publication.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Publication.prototype, "characterId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Publication.prototype, "publicationPlace", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Publication.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Publication.prototype, "outputData", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Publication.prototype, "volume", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => author_entity_1.Author),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Publication.prototype, "authors", void 0);
__decorate([
    (0, typeorm_1.RelationId)((publication) => publication.authors),
    __metadata("design:type", Array)
], Publication.prototype, "authorIds", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Publication.prototype, "coauthors", void 0);
Publication = __decorate([
    (0, typeorm_1.Entity)('publication')
], Publication);
exports.Publication = Publication;
//# sourceMappingURL=publication.entity.js.map