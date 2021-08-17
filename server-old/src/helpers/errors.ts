export const EnvError = (variable: string) => (
	`Environment variable ${variable.toUpperCase()} is not set`
)

export interface HttpError {
	name: string,
	message: string,
	status: number
}

const Error = (status: number, name: string, message: string) => (
	{ name, message, status } as Readonly<HttpError>
)

export const BadRequestError = (message: string) => (
	Error(400, 'BadRequestError', message)
)

export const wrongIdFormatError = (
	BadRequestError('Wrong object ID format')
)

export const noPropsError = (
	BadRequestError('Object missing any allowed properties')
)

export const UnauthorizedError = (message: string) => (
	Error(401, 'UnauthorizedError', message)
)

export const ForbiddenError = (message: string) => (
	Error(403, 'ForbiddenError', message)
)

export const NotFoundError = (message = 'Object not found') => (
	Error(404, 'NotFoundError', message)
)

export const ConflictError = (message = 'Object already exists') => (
	Error(409, 'ConflictError', message)
)

export const internalServerError = Error(
	500,
	'InternalServerError',
	'Oops, something went wrong while processing the request',
)
