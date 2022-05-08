import { IsArray, IsNotEmpty, IsString } from 'class-validator'

export class IdsDto {
	@IsArray()
	@IsString({ each: true })
	@IsNotEmpty({ each: true })
	ids: string[]
}
