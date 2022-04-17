import { IsNotEmpty, IsString } from 'class-validator'

export class CharacterDto {
	@IsString()
	@IsNotEmpty()
	name: string
}
