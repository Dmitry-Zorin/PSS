import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FileService } from './file.service'
import { GridFSModule } from './gridfs/gridfs.module'
import { GridFSService } from './gridfs/gridfs.service'
import { getGridFsStorage } from './gridfs/gridfs.storage'

interface Options {
	storage: 'gridfs'
}

@Module({})
export class FileModule {
	private static readonly storageOptions = {
		gridfs: {
			module: GridFSModule,
			service: GridFSService,
			getStorage: getGridFsStorage,
		},
	}

	static forRoot(options: Options) {
		const { module, service } = this.storageOptions[options.storage]
		return {
			module: FileModule,
			imports: [module],
			providers: [
				{
					provide: FileService,
					useClass: service,
				},
			],
			exports: [FileService],
		}
	}

	static getStorage(storage: 'gridfs', configService: ConfigService) {
		return this.storageOptions[storage].getStorage(configService)
	}
}
