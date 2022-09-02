import { HStack, StackProps } from '@chakra-ui/react'
import { motion, MotionProps } from 'framer-motion'

type TapProps = StackProps &
	MotionProps & {
		isTapped: boolean
		scale?: number
	}

export default function Tap({ isTapped, scale = 0.95, ...props }: TapProps) {
	return (
		<HStack
			as={motion.div}
			animate={{ scale: isTapped ? scale : 1 }}
			{...props}
		/>
	)
}
