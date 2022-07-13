import { Settings } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { animated, config, useSpring } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useRef, useState } from 'react'
import { AnimatedBox, gentleConfig } from '~/components'

const AnimatedSettingsIcon = animated(Settings)

const SettingsDial = ({ children }: { children: ReactNode }) => {
	const ref = useRef<HTMLDivElement>(null)
	const childRef = useRef<HTMLButtonElement>(null)
	const [open, setOpen] = useState(false)
	const [timeout, saveTimeout] = useState<NodeJS.Timeout>()

	return (
		<animated.div
			style={useSpring({
				rotate: 0,
				from: {
					rotate: -360,
				},
				config: config.molasses,
				delay: 600,
			})}
		>
			<AnimatedBox
				display="flex"
				justifyContent="flex-end"
				borderRadius={100}
				overflow="hidden"
				style={useSpring({
					config: gentleConfig,
					...(ref.current &&
						childRef.current && {
							width: open
								? ref.current.offsetWidth
								: childRef.current.offsetWidth,
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
					visibility={ref.current ? 'visible' : 'hidden'}
				>
					<IconButton
						ref={childRef}
						color="inherit"
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
		</animated.div>
	)
}

export default SettingsDial
