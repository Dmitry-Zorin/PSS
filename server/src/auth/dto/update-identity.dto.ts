import { Type } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator'
import { Locale, Theme } from '../user.entity'

class Settings {
	@IsOptional()
	@IsEnum(Locale)
	locale?: Locale

	@IsOptional()
	@IsEnum(Theme)
	theme?: Theme
}

export class UpdateSettingsDto {
	@IsNotEmpty()
	username: string

	@ValidateNested()
	@Type(() => Settings)
	payload: Settings
}
