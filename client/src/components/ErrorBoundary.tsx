import { ErrorInfo, useState } from 'react'
import { Error } from 'react-admin'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

const ErrorBoundary = () => {
	const [errorInfo, setErrorInfo] = useState<ErrorInfo>(null)

	const handleError = (error: Error, info: ErrorInfo) => {
		setErrorInfo(info)
	}
	return (
		<ReactErrorBoundary
			onError={handleError}
			fallbackRender={({ error, resetErrorBoundary }) => (
				<Error
					error={error}
					errorComponent={errorComponent}
					errorInfo={errorInfo}
					resetErrorBoundary={resetErrorBoundary}
					title={title}
				/>
			)}
		>
			{children}
		</ReactErrorBoundary>
	)
}

export default ErrorBoundary
