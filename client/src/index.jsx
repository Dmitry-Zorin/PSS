import React, { lazy, StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const App = lazy(() => import('./App'))

const Fallback = () => (
	<p>Loading... Please wait...</p>
)

ReactDOM.render(
	<StrictMode>
		<Suspense fallback={<Fallback/>}>
			<App/>
		</Suspense>
	</StrictMode>,
	document.getElementById('root'),
)
