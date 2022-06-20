import { Helmet } from 'react-helmet'

const BackgroundSetter = ({ color }: { color: string }) => (
	<Helmet>
		<meta name="theme-color" content={color} />
		<style type="text/css">{`body {	background-color: ${color} }`}</style>
	</Helmet>
)

export default BackgroundSetter
