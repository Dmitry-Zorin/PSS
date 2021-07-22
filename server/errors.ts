class CustomError extends Error {
	name: string
	status: number
	
	constructor(status: number, name: string, message: string) {
		super(message)
		this.name = name
		this.status = status
	}
}

export class BadRequestError extends CustomError {
	constructor(message = 'Invalid data') {
		super(400, 'BadRequestError', message)
	}
}

export class WrongIdFormatError extends BadRequestError {
	constructor() {
		super('Wrong ID format')
	}
}

export class UnauthorizedError extends CustomError {
	constructor(message: string) {
		super(401, 'UnauthorizedError', message)
	}
}

export class ForbiddenError extends CustomError {
	constructor(message: string) {
		super(403, 'ForbiddenError', message)
	}
}

export class NotFoundError extends CustomError {
	constructor(message: string) {
		super(404, 'NotFoundError', message)
	}
}

export class ConflictError extends CustomError {
	constructor(message: string) {
		super(409, 'ConflictError', message)
	}
}

export class InternalServerError extends CustomError {
	constructor(message: string) {
		super(500, 'InternalServerError', message)
	}
}
