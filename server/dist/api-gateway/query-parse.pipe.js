"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var QueryParsePipe_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParsePipe = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
let QueryParsePipe = QueryParsePipe_1 = class QueryParsePipe {
    static parseQuery(query) {
        return (0, lodash_1.transform)(query, (result, value, key) => {
            try {
                result[key] = JSON.parse(value);
            }
            catch {
                result[key] = value;
            }
        });
    }
    transform(data, metadata) {
        if (metadata.type !== 'query') {
            return data;
        }
        return QueryParsePipe_1.parseQuery(data);
    }
};
QueryParsePipe = QueryParsePipe_1 = __decorate([
    (0, common_1.Injectable)()
], QueryParsePipe);
exports.QueryParsePipe = QueryParsePipe;
//# sourceMappingURL=query-parse.pipe.js.map