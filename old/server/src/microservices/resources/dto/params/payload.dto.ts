import { IsNotEmptyObject } from 'class-validator'

export class PayloadDto {
	@IsNotEmptyObject()
	payload: any
}
