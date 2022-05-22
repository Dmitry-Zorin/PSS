import { IntersectionType } from '@nestjs/mapped-types'
import { PasswordParamDto, UsernameParamDto } from './params'

export class CredentialsDto extends IntersectionType(
	UsernameParamDto,
	PasswordParamDto,
) {}
