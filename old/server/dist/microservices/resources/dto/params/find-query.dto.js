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
exports.FindQueryDto = exports.FindListParamsDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const filter_values_1 = require("../filter-values");
const ids_param_dto_1 = require("./ids.param.dto");
const VALID_SORT_VALUES = ['ASC', 'DESC', 'asc', 'desc'];
class Sort {
    field;
    order;
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Sort.prototype, "field", void 0);
__decorate([
    (0, class_validator_1.IsIn)(VALID_SORT_VALUES),
    __metadata("design:type", Object)
], Sort.prototype, "order", void 0);
class FindListParamsDto {
    filter;
    sort;
    skip;
    take = 100;
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.Validate)(filter_values_1.FilterValues),
    __metadata("design:type", Object)
], FindListParamsDto.prototype, "filter", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Sort),
    __metadata("design:type", Sort)
], FindListParamsDto.prototype, "sort", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], FindListParamsDto.prototype, "skip", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], FindListParamsDto.prototype, "take", void 0);
exports.FindListParamsDto = FindListParamsDto;
class FindQueryDto extends (0, mapped_types_1.IntersectionType)((0, mapped_types_1.PartialType)(ids_param_dto_1.IdsParamDto), FindListParamsDto) {
}
exports.FindQueryDto = FindQueryDto;
//# sourceMappingURL=find-query.dto.js.map