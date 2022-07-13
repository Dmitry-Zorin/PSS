"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_module_1 = require("./controllers/auth/auth.module");
const resources_module_1 = require("./controllers/resources/resources.module");
exports.default = [
    {
        path: 'api',
        children: [
            {
                path: 'auth',
                module: auth_module_1.AuthModule,
            },
            {
                path: 'resources',
                module: resources_module_1.ResourcesModule,
            },
        ],
    },
];
//# sourceMappingURL=routes.js.map