import { HTMLAttributes } from 'react'
import { animated, useSpring } from 'react-spring'

const lightProperties = {
	circle: {
		r: 5,
	},
	mask: {
		cx: '100%',
		cy: '0%',
	},
	svg: {
		rotate: 45,
	},
	lines: {
		opacity: 1,
	},
} as const

const darkProperties = {
	circle: {
		r: 9,
	},
	mask: {
		cx: '50%',
		cy: '23%',
	},
	svg: {
		rotate: 45,
	},
	lines: {
		opacity: 0,
	},
} as const

const springConfig = {
	mass: 4,
	tension: 250,
	friction: 35,
}

interface DarkModeSwitchProps extends HTMLAttributes<HTMLOrSVGElement> {
	checked: boolean
	style?: React.CSSProperties
	size?: number | string
	moonColor?: string
	sunColor?: string
}

const DarkModeSwitch = ({
	checked = false,
	size = 24,
	moonColor = '#fff',
	sunColor = '#000',
	style,
	...props
}: DarkModeSwitchProps) => {
	const { circle, svg, lines, mask } = checked
		? darkProperties
		: lightProperties

	return (
		<animated.svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			color={checked ? moonColor : sunColor}
			fill="none"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			stroke="currentColor"
			style={{
				cursor: 'pointer',
				...useSpring({
					...svg,
					config: springConfig,
				}),
				...style,
			}}
			{...props}
		>
			<mask id="mask">
				<rect x="0" y="0" width="100%" height="100%" fill="white" />
				<animated.circle
					style={useSpring({
						...mask,
						config: springConfig,
					})}
					r="9"
					fill="black"
				/>
			</mask>
			<animated.circle
				cx="12"
				cy="12"
				fill={checked ? moonColor : sunColor}
				style={useSpring({
					...circle,
					config: springConfig,
				})}
				mask="url(#mask)"
			/>
			<animated.g
				stroke="currentColor"
				style={useSpring({
					...lines,
					config: springConfig,
				})}
			>
				<line x1="12" y1="1" x2="12" y2="3" />
				<line x1="12" y1="21" x2="12" y2="23" />
				<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
				<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
				<line x1="1" y1="12" x2="3" y2="12" />
				<line x1="21" y1="12" x2="23" y2="12" />
				<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
				<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
			</animated.g>
		</animated.svg>
	)
}

export default DarkModeSwitch
