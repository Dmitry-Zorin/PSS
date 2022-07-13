"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omitNullDeep = void 0;
const lodash_1 = require("lodash");
function omitNullDeep(e) {
    if (e === null) {
        return undefined;
    }
    if (Array.isArray(e)) {
        return e.map(omitNullDeep);
    }
    if ((0, lodash_1.isObject)(e) && !(0, lodash_1.isEmpty)(e)) {
        return (0, lodash_1.mapValues)(e, omitNullDeep);
    }
    return e;
}
exports.omitNullDeep = omitNullDeep;
//# sourceMappingURL=utilities.js.map