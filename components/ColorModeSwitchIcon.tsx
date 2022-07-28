import { Icon, IconProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { gentleSpringConfig } from 'utils'

interface ColorModeSwitchIconProps extends IconProps {
	showMoon: boolean
}

export default function ColorModeSwitchIcon({
	showMoon,
	...props
}: ColorModeSwitchIconProps) {
	const transition = gentleSpringConfig

	return (
		<Icon
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			strokeWidth={0}
			{...props}
		>
			<mask id="mask">
				<rect x={0} y={0} width="100%" height="100%" fill="white" />
				<motion.circle
					r={10}
					fill="black"
					initial={false}
					animate={{
						cx: showMoon ? '80%' : '100%',
						cy: showMoon ? '30%' : '0%',
						transition,
					}}
				/>
			</mask>
			<motion.circle
				mask="url(#mask)"
				cx={12}
				cy={12}
				fill="currentColor"
				initial={false}
				animate={{
					r: showMoon ? 10 : 4,
					transition,
				}}
			/>
			<motion.g
				stroke="currentColor"
				strokeLinecap="round"
				initial={false}
				animate={{
					strokeWidth: showMoon ? 0 : 2,
					scale: showMoon ? 0.75 : 1,
					transition,
				}}
			>
				<line x1={12} y1={2} x2={12} y2={4} />
				<line x1={12} y1={20} x2={12} y2={22} />
				<line x1={4.87} y1={4.87} x2={6.3} y2={6.3} />
				<line x1={17.7} y1={17.7} x2={19.13} y2={19.13} />
				<line x1={2} y1={12} x2={4} y2={12} />
				<line x1={20} y1={12} x2={22} y2={12} />
				<line x1={4.87} y1={19.13} x2={6.3} y2={17.7} />
				<line x1={17.7} y1={6.3} x2={19.13} y2={4.87} />
			</motion.g>
		</Icon>
	)
}
