import { IsString, Length } from 'class-validator'

export class PasswordParamDto {
	@IsString()
	@Length(1, 50)
	password: string
}
