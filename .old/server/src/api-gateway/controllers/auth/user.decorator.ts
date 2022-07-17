import { createParamDecorator, ExecutionContext } from '@nestjs/common'

const User = createParamDecorator(
	(data: unknown, context: ExecutionContext) => {
		return context.switchToHttp().getRequest().user
	},
)

export default User
