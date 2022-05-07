import { IsNotEmpty, IsString } from 'class-validator'
import { CreateDto } from './create.dto'

export class UpdateDto extends CreateDto {
	@IsString()
	@IsNotEmpty()
	id: string
}
