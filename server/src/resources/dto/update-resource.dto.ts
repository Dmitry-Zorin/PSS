import { IsNotEmpty, IsString } from 'class-validator'
import { CreateResourceDto } from './create-resource.dto'

export class UpdateResourceDto extends CreateResourceDto {
	@IsString()
	@IsNotEmpty()
	id: string
}
