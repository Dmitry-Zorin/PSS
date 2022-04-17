import { Type } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Role } from '../db/db.service'

class PaginationOptionsDto {
	@IsOptional()
	match?: Record<string, unknown>

	@IsOptional()
	sort?: Record<string, string>

	@IsOptional()
	skip?: number

	@IsOptional()
	limit?: number
}

export class FindResourcesDto {
	@IsString()
	@IsNotEmpty()
	resource: string

	@ValidateNested()
	@Type(() => PaginationOptionsDto)
	query: PaginationOptionsDto

	@IsEnum(Role)
	@IsNotEmpty()
	role: Role
}
