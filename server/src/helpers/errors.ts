export const createEnvError = (variable: string) => (
	`Environment variable ${variable.toUpperCase()} is not set`
)

export interface HttpError {
	name: string,
	message: string,
	status: number
}

const createError = (status: number, name: string, message: string) => (
	Object.freeze({ status, name, message } as HttpError)
)

export const createBadRequestError = (message: string) => (
	createError(400, 'BadRequestError', message)
)

export const wrongIdFormatError = (
	createBadRequestError('Wrong object ID format')
)

export const noPropsError = (
	createBadRequestError('Object missing any allowed properties')
)

export const createUnauthorizedError = (message: string) => (
	createError(401, 'UnauthorizedError', message)
)

export const createForbiddenError = (message: string) => (
	createError(403, 'ForbiddenError', message)
)

export const createNotFoundError = (message = 'Object not found') => (
	createError(404, 'NotFoundError', message)
)

export const createConflictError = (message = 'Object already exists') => (
	createError(409, 'ConflictError', message)
)

export const createInternalServerError = () => {
	const message = 'Oops, something went wrong while processing the request'
	return createError(500, 'InternalServerError', message)
}
