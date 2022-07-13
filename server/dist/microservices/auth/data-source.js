"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const auth_module_1 = require("./auth.module");
exports.default = new typeorm_1.DataSource({
    ...auth_module_1.baseTypeOrmOptions,
    url: process.env.AUTH_POSTGRES_URL,
    migrations: ['src/microservices/auth/migrations/*'],
});
//# sourceMappingURL=data-source.js.map