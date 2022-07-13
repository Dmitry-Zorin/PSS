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
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let FileService = class FileService {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
    async download(resource, fileId) {
        if (!mongoose_2.mongo.ObjectId.isValid(fileId)) {
            throw new common_1.BadRequestException('Invalid file ID');
        }
        const objectId = new mongoose_2.mongo.ObjectId(fileId);
        const bucket = this.getGridFSBucket(resource);
        const files = await bucket.find({ _id: objectId }).toArray();
        if (!files.length) {
            throw new common_1.NotFoundException('File not found');
        }
        return {
            file: bucket.openDownloadStream(objectId),
            filename: files[0].filename,
        };
    }
    async delete(resource, fileId) {
        if (!mongoose_2.mongo.ObjectId.isValid(fileId))
            return;
        const objectId = new mongoose_2.mongo.ObjectId(fileId);
        const bucket = this.getGridFSBucket(resource);
        return bucket.delete(objectId).catch((err) => {
            if (!err)
                return;
            console.error(err);
        });
    }
    async deleteMany(resource, fileIds) {
        await Promise.all(fileIds.map(async (id) => {
            await this.delete(resource, id);
        }));
    }
    getGridFSBucket(resource) {
        return new mongoose_2.mongo.GridFSBucket(this.connection.db, {
            bucketName: resource,
        });
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Connection])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map