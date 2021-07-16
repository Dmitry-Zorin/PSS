export class BadRequestError extends Error {
	constructor(message) {
		super(message)
		this.name = 'BadRequestError'
		this.status = 400
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
