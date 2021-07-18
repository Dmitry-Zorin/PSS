export class BadRequestError extends Error {
	constructor(message) {
		super(message || 'Invalid data')
		this.name = 'BadRequestError'
		this.status = 400
	}
}

export class WrongIdFormatError extends BadRequestError {
	constructor() {
		super('Wrong ID format')
	}
}

export class UnauthorizedError extends Error {
	constructor(message) {
		super(message)
		this.name = 'UnauthorizedError'
		this.status = 401
	}
}

export class ForbiddenError extends Error {
	constructor(message) {
		super(message)
		this.name = 'ForbiddenError'
		this.status = 403
	}
}

export class NotFoundError extends Error {
	constructor(objectName) {
		super(`${objectName} not found`)
		this.name = 'NotFoundError'
		this.status = 404
	}
}

export class ConflictError extends Error {
	constructor(message) {
		super(message)
		this.name = 'ConflictError'
		this.status = 409
	}
}

export class InternalServerError extends Error {
	constructor(message) {
		super(message)
		this.name = 'InternalServerError'
		this.status = 500
	}
}
