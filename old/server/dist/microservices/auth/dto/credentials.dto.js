"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const params_1 = require("./params");
class CredentialsDto extends (0, mapped_types_1.IntersectionType)(params_1.UsernameParamDto, params_1.PasswordParamDto) {
}
exports.CredentialsDto = CredentialsDto;
//# sourceMappingURL=credentials.dto.js.map