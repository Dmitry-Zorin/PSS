import { BadRequestException } from '@nestjs/common'

export class WrongIdFormatException extends BadRequestException {
	constructor() {
		super('Wrong ID format')
	}
}

export class NoValidPropsException extends BadRequestException {
	constructor() {
		super('Request body missing any valid properties')
	}
}
