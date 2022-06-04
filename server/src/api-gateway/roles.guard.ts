import {
	CanActivate,
	ExecutionContext,
	Injectable,
	SetMetadata
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

export enum Role {
	User = 'user',
	Admin = 'admin',
}

const ROLES_KEY = 'roles'

export const Roles = (...roles: Role[]) => {
	return SetMetadata(ROLES_KEY, roles)
}

export const Admin = () => {
	return SetMetadata(ROLES_KEY, Role.Admin)
}

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext) {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		])
		if (!requiredRoles) {
			return true
		}
		const { user } = context.switchToHttp().getRequest()
		return requiredRoles.includes(user.role)
	}
}
