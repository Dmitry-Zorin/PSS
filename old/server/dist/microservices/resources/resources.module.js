"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesModule = exports.baseTypeOrmOptions = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const joi_1 = __importDefault(require("joi"));
const constants_1 = require("./constants");
const entities = __importStar(require("./entities"));
const other_resources_module_1 = require("./other-resources/other-resources.module");
const resource_item_module_1 = require("./resource-item/resource-item.module");
const resources_controller_1 = require("./resources.controller");
const resources_service_1 = require("./resources.service");
exports.baseTypeOrmOptions = {
    type: 'postgres',
    entities: Object.values(entities),
};
let ResourcesModule = class ResourcesModule {
};
ResourcesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                validationSchema: joi_1.default.object({
                    RESOURCES_POSTGRES_URL: joi_1.default.string().required(),
                }).unknown(),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                name: constants_1.CONNECTION_NAME,
                useFactory: (configService) => {
                    const isProd = configService.get('NODE_ENV') === 'production';
                    return {
                        ...exports.baseTypeOrmOptions,
                        url: configService.get('RESOURCES_POSTGRES_URL'),
                        keepConnectionAlive: !isProd,
                        logging: !isProd,
                        cache: isProd,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            resource_item_module_1.ResourceItemModule,
            other_resources_module_1.OtherResourcesModule,
        ],
        controllers: [resources_controller_1.ResourcesController],
        providers: [resources_service_1.ResourcesService],
    })
], ResourcesModule);
exports.ResourcesModule = ResourcesModule;
//# sourceMappingURL=resources.module.js.map