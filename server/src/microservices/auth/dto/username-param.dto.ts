import { IsString, Length } from 'class-validator'

export class UsernameParamDto {
	@IsString()
	@Length(1, 50)
	username: string
}
