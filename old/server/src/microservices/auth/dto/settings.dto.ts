import { IsEnum, IsOptional } from 'class-validator'
import { Locale, Theme } from '../enums'

export class SettingsDto {
	@IsOptional()
	@IsEnum(Locale)
	locale?: Locale

	@IsOptional()
	@IsEnum(Theme)
	theme?: Theme
}
