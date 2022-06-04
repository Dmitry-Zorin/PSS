import { Loader } from 'components'

export const LoadingScreen = ({ color }) => (
	<div style={{ display: 'flex', height: '100vh' }}>
		<div style={{ margin: 'auto' }}>
			<Loader color={color} />
		</div>
	</div>
)
