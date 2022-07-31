import { Box, BoxProps } from '@chakra-ui/react'
import { motion, MotionProps } from 'framer-motion'
import { getSpringAnimation } from 'utils'

type TapProps = BoxProps &
	MotionProps & {
		isTapped: boolean
		scale?: number
		opacity?: number
	}

export default function Tap({
	isTapped,
	scale = 0.9,
	opacity = 0.75,
	...props
}: TapProps) {
	return (
		<Box
			as={motion.span}
			lineHeight={1}
			initial={false}
			animate={{
				scale: isTapped ? scale : 1,
				opacity: isTapped ? opacity : 1,
				// transition: getSpringAnimation(!isTapped),
			}}
			{...props}
		/>
	)
}
