import { Modal, ModalProps } from '@mui/material'
import { AnimatedBox, Slide } from 'components'

const Drawer = ({ children, open, sx, ...props }: ModalProps) => (
	<Modal open={open} closeAfterTransition keepMounted {...props}>
		<Slide in={open} from="left">
			<AnimatedBox
				sx={[
					{
						position: 'absolute',
						height: '100vh',
					},
					...(Array.isArray(sx) ? sx : [sx]),
				]}
			>
				{children}
			</AnimatedBox>
		</Slide>
	</Modal>
)

export default Drawer
