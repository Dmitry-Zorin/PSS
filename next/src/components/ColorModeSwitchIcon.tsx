import { motion, SVGMotionProps } from 'framer-motion'

const lightProperties = {
	circle: {
		r: 4,
	},
	mask: {
		cx: '100%',
		cy: '0%',
	},
	svg: {
		rotate: -120,
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
		cy: '15%',
	},
	svg: {
		rotate: 60,
	},
	lines: {
		opacity: 0,
	},
} as const

const transition = {
	type: 'spring',
	mass: 4,
	stiffness: 250,
	damping: 35,
}

interface ColorModeSwitchIconProps extends SVGMotionProps<SVGElement> {
	showMoon: boolean
	moonColor?: string
	sunColor?: string
}

export default function ColorModeSwitchIcon({
	showMoon,
	moonColor = '#000',
	sunColor = '#fff',
	...props
}: ColorModeSwitchIconProps) {
	const color = showMoon ? moonColor : sunColor
	const { circle, svg, lines, mask } = showMoon
		? darkProperties
		: lightProperties

	return (
		<motion.svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			color={color}
			animate={{
				...svg,
				transition,
			}}
			{...props}
		>
			<mask id="mask">
				<rect x="0" y="0" width="100%" height="100%" fill="white" />
				<motion.circle r="9" fill="black" animate={{ ...mask, transition }} />
			</mask>
			<motion.circle
				cx="12"
				cy="12"
				fill={color}
				animate={{
					...circle,
					transition,
				}}
				mask="url(#mask)"
			/>
			<motion.g stroke="currentColor" animate={{ ...lines, transition }}>
				<line x1="12" y1="1" x2="12" y2="3" />
				<line x1="12" y1="21" x2="12" y2="23" />
				<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
				<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
				<line x1="1" y1="12" x2="3" y2="12" />
				<line x1="21" y1="12" x2="23" y2="12" />
				<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
				<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
			</motion.g>
		</motion.svg>
	)
}
