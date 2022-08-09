import { Box, BoxProps } from '@chakra-ui/react'
import { motion, MotionProps } from 'framer-motion'

type TapProps = BoxProps &
	MotionProps & {
		isTapped: boolean
		scale?: number
	}

export default function Tap({ isTapped, scale = 0.95, ...props }: TapProps) {
	return (
		<Box as={motion.div} animate={{ scale: isTapped ? scale : 1 }} {...props} />
	)
}
