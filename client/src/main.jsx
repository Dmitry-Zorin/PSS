import { Lazy, LoadingScreen } from 'components'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet'
import './index.css'
import themes from './themes'
import { getUser, guest, setUser } from './user'
import '@fontsource/nunito-sans/400.css'
import '@fontsource/nunito-sans/600.css'
import '@fontsource/nunito-sans/700.css'
import '@fontsource/nunito-sans/800.css'
import '@fontsource/nunito-sans/900.css'

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
				{`body { background: ${palette.background.default}}`}
			</style>
		</Helmet>
		<Lazy
			component={() => import('./App')}
			fallback={<LoadingScreen color={palette.primary.main} />}
		/>
	</StrictMode>,
	document.getElementById('root'),
)
