"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const resources_module_1 = require("./resources.module");
exports.default = new typeorm_1.DataSource({
    ...resources_module_1.baseTypeOrmOptions,
    url: process.env.RESOURCES_POSTGRES_URL,
    migrations: ['src/microservices/resources/migrations/*'],
    cache: true,
});
//# sourceMappingURL=data-source.js.map