import { Loader } from 'components'
import { Delay } from './Delay'

export const LoadingScreen = ({ color }) => (
	<Delay ms={200}>
		<div style={{ display: 'flex', height: '100vh' }}>
			<div style={{ margin: 'auto' }}>
				<Loader color={color} />
			</div>
		</div>
	</Delay>
)
