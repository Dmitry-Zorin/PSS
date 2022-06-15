import '@fontsource/montserrat/variable.css'
import { Lazy, LoadingScreen } from 'components'
import 'index.css'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet'
import themes from 'themes'
import { getUser, guest, setUser } from 'user'

let user = getUser()

if (!user) {
	setUser((user = guest))
}

const { palette } = themes[user.settings.theme]

ReactDOM.render(
	<StrictMode>
		<Helmet>
			<meta name="theme-color" content={palette.background.default} />
			<style type="text/css">
				{`body { background-color: ${palette.background.default}}`}
			</style>
		</Helmet>
		<Lazy
			component={() => import('./App')}
			fallback={<LoadingScreen color={palette.primary.main} />}
		/>
	</StrictMode>,
	document.getElementById('root'),
)
