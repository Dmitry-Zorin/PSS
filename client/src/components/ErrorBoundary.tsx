import { ErrorInfo, useState } from 'react'
import { Error } from 'react-admin'
import { ErrorBoundary } from 'react-error-boundary'

const ErrorBoundary2 = ({}) => {
	const [errorInfo, setErrorInfo] = useState<ErrorInfo>(null)

	const handleError = (error: Error, info: ErrorInfo) => {
		setErrorInfo(info)
	}
	return (
		<ErrorBoundary
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
		</ErrorBoundary>
	)
}
