"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@fastify/cors"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const config_1 = require("@nestjs/config");
const app_1 = __importDefault(require("./app"));
async function bootstrap() {
    const app = await (0, app_1.default)();
    const configService = app.get(config_1.ConfigService);
    await app.register(cors_1.default, {
        origin: /^http:\/\/localhost/,
        exposedHeaders: 'content-range',
        credentials: true,
    });
    await app.register(helmet_1.default);
    await app.listen(configService.get('PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map