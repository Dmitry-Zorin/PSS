import { IsString, MaxLength } from 'class-validator'

export class UsernameParamDto {
	@IsString()
	@MaxLength(50)
	username: string
}
