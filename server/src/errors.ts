import { BadRequestException } from '@nestjs/common'

export const wrongIdFormatError = (
	new BadRequestException('Wrong ID format')
)

export const noPropsError = (
	new BadRequestException('Object missing any allowed properties')
)
