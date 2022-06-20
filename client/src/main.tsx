import '@fontsource/montserrat/variable.css'
import { BackgroundSetter, Lazy, LoadingScreen } from 'components'
import 'index.css'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import themes from 'themes'
import { getUser } from 'user'

const { palette } = themes[getUser().settings.theme]

ReactDOM.render(
	<StrictMode>
		<BackgroundSetter color={palette.background.default} />
		<Lazy
			component={() => import('./App')}
			fallback={<LoadingScreen color={palette.primary.main} />}
		/>
	</StrictMode>,
	document.getElementById('root'),
)
