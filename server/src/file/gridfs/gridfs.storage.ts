import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { GridFsStorage } from 'multer-gridfs-storage'

export const getGridFsStorage = (configService: ConfigService) => {
	return new GridFsStorage({
		url: `${configService.get('MONGO_URI')}/${configService.get('MONGO_DB_NAME')}-files`,
		file: (req: Request) => ({ bucketName: req.params.resource }),
	})
}