"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGatewayModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const joi_1 = __importDefault(require("joi"));
const auth_module_1 = require("./controllers/auth/auth.module");
const resources_module_1 = require("./controllers/resources/resources.module");
const exception_filter_1 = require("./exception.filter");
const jwt_guard_1 = require("./jwt/jwt.guard");
const jwt_module_1 = require("./jwt/jwt.module");
const query_parse_pipe_1 = require("./query-parse.pipe");
const roles_guard_1 = require("./roles.guard");
const routes_1 = __importDefault(require("./routes"));
let ApiGatewayModule = class ApiGatewayModule {
};
ApiGatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                validationSchema: joi_1.default.object({
                    UI_SERVER: joi_1.default.string().default(false),
                    PORT: joi_1.default.number().default(3000),
                    TCP_PORT: joi_1.default.number().default(3001),
                    SECRET: joi_1.default.string().required(),
                }).unknown(),
            }),
            jwt_module_1.JwtModule,
            core_1.RouterModule.register(routes_1.default),
            auth_module_1.AuthModule,
            resources_module_1.ResourcesModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_guard_1.JwtGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
            {
                provide: core_1.APP_PIPE,
                useClass: query_parse_pipe_1.QueryParsePipe,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: exception_filter_1.AllExceptionsFilter,
            },
        ],
    })
], ApiGatewayModule);
exports.ApiGatewayModule = ApiGatewayModule;
//# sourceMappingURL=api-gateway.module.js.map