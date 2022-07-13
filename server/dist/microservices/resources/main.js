"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const resources_module_1 = require("./../../api-gateway/controllers/resources/resources.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(resources_module_1.ResourcesModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            port: 3001,
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map