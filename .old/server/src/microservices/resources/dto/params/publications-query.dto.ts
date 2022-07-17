import { IsUUID } from 'class-validator'

export class PublicationsQueryDto {
	@IsUUID()
	authorId: string
}
