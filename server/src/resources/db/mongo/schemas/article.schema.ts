import { Prop, Schema } from '@nestjs/mongoose'

@Schema()
export class Article {
	@Prop({ required: true })
	title: string

	@Prop()
	description?: string

	@Prop()
	type?: string

	@Prop()
	year?: number

	@Prop()
	volume?: number

	@Prop({ required: true })
	authors: string[]

	@Prop()
	character?: string

	@Prop()
	exitData?: string
}
