import { Prop, Schema } from '@nestjs/mongoose'
import { values } from 'lodash'
import { Locale, Role, Theme } from '../../types'

@Schema()
export class User {
	@Prop({ required: true })
	username: string

	@Prop({ required: true })
	password: string

	@Prop({ type: String, enum: values(Role), default: Role.User })
	role?: Role

	@Prop({ type: String, enum: values(Locale) })
	locale?: Locale

	@Prop({ type: String, enum: values(Theme) })
	theme?: Theme
}
