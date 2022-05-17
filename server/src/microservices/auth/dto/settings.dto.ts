import { IsEnum, IsOptional } from 'class-validator'
import { Locale, Theme } from '../entities/settings.entity'

export class SettingsDto {
	@IsOptional()
	@IsEnum(Locale)
	locale?: Locale

	@IsOptional()
	@IsEnum(Theme)
	theme?: Theme
}
