import { gentleConfig } from 'components'
import { forwardRef, ReactElement } from 'react'
import { animated, useSpring } from 'react-spring'

interface SlideProps {
	children: ReactElement
	in: boolean
	onEnter?: () => void
	onExited?: () => void
}

const Slide = forwardRef<HTMLDivElement, SlideProps>(
	({ children, in: slideIn, onEnter, onExited, ...props }, ref) => (
		<animated.div
			ref={ref}
			style={useSpring({
				x: slideIn ? '0%' : '-100%',
				from: { x: '-100%' },
				config: gentleConfig,
				onStart: () => {
					if (slideIn) {
						onEnter?.()
					}
				},
				onRest: () => {
					if (!slideIn) {
						onExited?.()
					}
				},
			})}
			{...props}
		>
			{children}
		</animated.div>
	),
)

export default Slide
