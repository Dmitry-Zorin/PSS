import { Settings } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { AnimatedBox, gentleConfig, Slide } from 'components'
import { ReactNode, useRef, useState } from 'react'
import { animated, useSpring } from 'react-spring'

const PADDING = 2

const AnimatedSettingsIcon = animated(Settings)

const Dial = ({ children }: { children: ReactNode }) => {
	const ref = useRef<HTMLDivElement>(null)
	const childRef = useRef<HTMLButtonElement>(null)
	const [open, setOpen] = useState(false)
	const [timeout, saveTimeout] = useState<NodeJS.Timeout>()

	return (
		<Slide
			from="top"
			config={{
				tension: 125,
				friction: 10,
			}}
			delay={500}
		>
			<AnimatedBox
				position="absolute"
				display="flex"
				justifyContent="flex-end"
				borderRadius={100}
				overflow="hidden"
				// bgcolor="background.header"
				border={1}
				borderColor="border"
				style={useSpring({
					...(ref.current &&
						childRef.current && {
							width: open
								? ref.current.offsetWidth + 2 + 2 * PADDING
								: childRef.current.offsetWidth + 2 + 2 * PADDING,
							height: ref.current.offsetHeight + 2 + 2 * PADDING,
							padding: PADDING,
							config: gentleConfig,
						}),
				})}
				onMouseEnter={() => {
					clearTimeout(timeout)
					setOpen(true)
				}}
				onMouseLeave={() => {
					saveTimeout(setTimeout(() => setOpen(false), 200))
				}}
			>
				<AnimatedBox
					ref={ref}
					display="flex"
					flexDirection="row-reverse"
					m="auto"
				>
					<IconButton
						ref={childRef}
						color="inherit"
						size="small"
						sx={{
							'&, :hover': {
								color: open ? 'text.disabled' : undefined,
								bgcolor: 'transparent',
								cursor: 'default',
							},
						}}
					>
						<AnimatedSettingsIcon
							style={useSpring({
								rotate: 30 * +open,
								config: gentleConfig,
							})}
						/>
					</IconButton>
					{children}
				</AnimatedBox>
			</AnimatedBox>
		</Slide>
	)
}

export default Dial
