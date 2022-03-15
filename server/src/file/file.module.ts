import { Global, Module } from '@nestjs/common'
import { FileService } from './file.service'
import { GridFSModule } from './gridfs/gridfs.module'
import { GridFSService } from './gridfs/gridfs.service'

interface Options {
	storage: 'gridfs'
}

@Global()
@Module({})
export class FileModule {
	private static readonly storageOptions = {
		gridfs: {
			module: GridFSModule,
			service: GridFSService,
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
}
