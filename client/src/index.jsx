import { Lazy, LoadingScreen } from 'components'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet'
import './index.css'
import themes from './themes'
import { getUser } from './user'

const theme = themes[getUser()?.theme || 'light']

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
			fallback={<LoadingScreen color={theme.palette.primary.main} />}
			theme={theme}
		/>
	</StrictMode>,
	document.getElementById('root'),
)
