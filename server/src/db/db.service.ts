import { Injectable } from '@nestjs/common'
import { MongoService } from './mongo/mongo.service'

@Injectable()
export class DbService extends MongoService {}
