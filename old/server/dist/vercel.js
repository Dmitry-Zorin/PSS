"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
let instance;
const isProd = process.env.NODE_ENV === 'production';
const options = {
    ...(isProd && {
        logger: ['error', 'warn'],
    }),
};
async function default_1(req, res) {
    if (!instance) {
        const app = await (0, app_1.default)(options);
        await app.init();
        instance = app.getHttpAdapter().getInstance();
        await instance.ready();
    }
    instance.server.emit('request', req, res);
}
exports.default = default_1;
//# sourceMappingURL=vercel.js.map