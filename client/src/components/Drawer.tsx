import { Box, Modal, ModalProps } from '@mui/material'
import { Slide } from 'components'

const Drawer = ({ children, open, sx, ...props }: ModalProps) => (
	<Modal open={open} closeAfterTransition {...props}>
		<Slide in={open}>
			<Box
				sx={{
					position: 'absolute',
					height: '100vh',
					...sx,
				}}
			>
				{children}
			</Box>
		</Slide>
	</Modal>
)

export default Drawer
