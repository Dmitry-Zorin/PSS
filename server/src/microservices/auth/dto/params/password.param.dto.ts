import { IsString, MaxLength } from 'class-validator'

export class PasswordParamDto {
	@IsString()
	@MaxLength(50)
	password: string
}
