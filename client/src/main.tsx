import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'assets/fonts/Alumni_Sans/variable.css'
import 'assets/fonts/Mulish/variable.css'
import App from './App'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
)
