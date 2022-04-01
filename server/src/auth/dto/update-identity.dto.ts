import { Type } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'
import { Locale, Theme } from '../user.entity'

class SettingsDto {
	@IsOptional()
	@IsEnum(Locale)
	locale?: Locale

	@IsOptional()
	@IsEnum(Theme)
	theme?: Theme
}

export class UpdateSettingsDto {
	@IsString()
	@IsNotEmpty()
	username: string

	@ValidateNested()
	@Type(() => SettingsDto)
	payload: SettingsDto
}
