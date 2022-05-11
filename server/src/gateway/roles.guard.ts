import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

export enum Role {
	User = 'user',
	Admin = 'admin'
}

const ROLE_KEY = 'role'

export const Roles = (role: Role) => (
	SetMetadata(ROLE_KEY, role)
)

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext) {
		const requiredRole = this.reflector.getAllAndOverride<Role>(ROLE_KEY, [
			context.getHandler(),
			context.getClass(),
		])
		if (!requiredRole) {
			return true
		}
		const { user } = context.switchToHttp().getRequest()
		return user.role === requiredRole
	}
}
