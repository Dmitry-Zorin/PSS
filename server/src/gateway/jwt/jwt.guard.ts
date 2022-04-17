import { ExecutionContext, Injectable, SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

const IS_PUBLIC_KEY = 'isPublic'

export const Public = () => (
	SetMetadata(IS_PUBLIC_KEY, true)
)

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
	constructor(private readonly reflector: Reflector) {
		super()
	}

	async canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		])
		return isPublic || super.canActivate(context)
	}
}
