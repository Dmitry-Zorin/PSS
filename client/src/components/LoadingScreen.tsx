import { Delay, Loader } from 'components'

const LoadingScreen = ({ color }: { color: string }) => (
	<Delay ms={200}>
		<div style={{ display: 'flex', height: '100vh' }}>
			<div style={{ margin: 'auto' }}>
				<Loader color={color} />
			</div>
		</div>
	</Delay>
)

export default LoadingScreen
