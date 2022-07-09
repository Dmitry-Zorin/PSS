import { ArgumentsHost, Catch } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { FastifyReply } from 'fastify'

interface RpcException {
	message: string
	error: {
		status: number
		response: Record<string, any>
	}
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
	private static isRpcException(exception: any): exception is RpcException {
		return !!exception.message?.startsWith('Rpc')
	}

	catch(exception: RpcException | unknown, host: ArgumentsHost) {
		if (!AllExceptionsFilter.isRpcException(exception)) {
			return super.catch(exception, host)
		}

		const http = host.switchToHttp()
		const res = http.getResponse<FastifyReply>()

		const { status, response } = exception.error

		if (Array.isArray(response.message)) {
			response.message = response.message.join('; ')
		}

		return res.code(status).send(response)
	}
}