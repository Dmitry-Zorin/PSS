"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcryptjs_1 = require("bcryptjs");
const lodash_1 = require("lodash");
const typeorm_2 = require("typeorm");
const constants_1 = require("./constants");
const entities_1 = require("./entities");
let AuthService = class AuthService {
    entityManager;
    userRepository;
    settingsRepository;
    logger = new common_1.Logger('AuthService');
    constructor(entityManager, userRepository, settingsRepository) {
        this.entityManager = entityManager;
        this.userRepository = userRepository;
        this.settingsRepository = settingsRepository;
    }
    async createUser(username, password) {
        return this.entityManager.transaction(async (manager) => {
            const user = manager.create(entities_1.User, {
                username,
                password: await (0, bcryptjs_1.hash)(password, await (0, bcryptjs_1.genSalt)(constants_1.SALT_ROUNDS)),
            });
            try {
                await manager.insert(entities_1.User, user);
            }
            catch (e) {
                if (e instanceof typeorm_2.QueryFailedError) {
                    if (e.message.startsWith('duplicate key')) {
                        throw new common_1.ConflictException('User already exists');
                    }
                }
                this.logger.error(e, e?.stack);
                throw new common_1.BadRequestException('Failed to create user');
            }
            const settings = manager.create(entities_1.Settings, { userId: user.id });
            await manager.insert(entities_1.Settings, settings);
            return {
                ...(0, lodash_1.omit)(user, 'password'),
                settings,
            };
        });
    }
    async updateSettings(id, settings) {
        await this.settingsRepository.update(id, settings);
    }
    async findUser(filter, options = {}) {
        const { withSettings = true, passwordToVerify } = options;
        const [user] = await this.userRepository.find({
            where: filter,
            relations: {
                settings: withSettings,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (passwordToVerify) {
            const isCorrectPassword = await (0, bcryptjs_1.compare)(passwordToVerify, user.password);
            if (!isCorrectPassword) {
                throw new common_1.UnauthorizedException('Incorrect password');
            }
        }
        return (0, lodash_1.omit)(user, 'password');
    }
    async removeUser(id) {
        await this.entityManager.transaction(async (manager) => {
            await manager.delete(entities_1.Settings, id);
            await manager.delete(entities_1.User, id);
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectEntityManager)(constants_1.CONNECTION_NAME)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.User, constants_1.CONNECTION_NAME)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.Settings, constants_1.CONNECTION_NAME)),
    __metadata("design:paramtypes", [typeorm_2.EntityManager,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map