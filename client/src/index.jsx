import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet'
import './index.css'
import Lazy from './Lazy'
import Loader from './Loader'
import { themes } from './theme/theme'
import { getUser } from './user'

const theme = themes[getUser()?.theme || 'light']

const loadingScreen = (
	<div style={{ display: 'flex', height: '100vh' }}>
		<div style={{ margin: 'auto' }}>
			<Loader color={theme.palette.primary.main} />
		</div>
	</div>
)

ReactDOM.render(
	<StrictMode>
		<Helmet>
			<style type="text/css">
				{`
					body {
						background: ${theme.palette.background.default}
					}
				`}
			</style>
		</Helmet>
		<Lazy
			component={() => import('./App')}
			fallback={loadingScreen}
			theme={theme}
		/>
	</StrictMode>,
	document.getElementById('root'),
)
