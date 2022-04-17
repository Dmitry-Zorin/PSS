import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { Role } from '../db/db.service'

export class FindResourceDto {
	@IsString()
	@IsNotEmpty()
	resource: string

	@IsString()
	@IsNotEmpty()
	id: string

	@IsEnum(Role)
	@IsNotEmpty()
	role: Role
}
