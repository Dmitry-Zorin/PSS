import { IsArray, IsUUID } from 'class-validator'

export class IdsParamDto {
	@IsArray()
	@IsUUID(undefined, { each: true })
	ids: string[]
}
