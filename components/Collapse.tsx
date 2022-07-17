import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { gentleSpringConfig } from 'utils'

type Orientation = 'vertical' | 'horizontal'

type CollapseProps = {
	children: ReactNode
	in: boolean
	orientation?: Orientation
}

const Collapse = ({
	children,
	in: collapseIn,
	orientation = 'vertical',
}: CollapseProps) => {
	const property = orientation === 'vertical' ? 'height' : 'width'

	return (
		<Box
			as={motion.div}
			overflow="hidden"
			initial={false}
			animate={{
				[property]: collapseIn ? 'auto' : 0,
				transition: gentleSpringConfig,
			}}
		>
			{children}
		</Box>
	)
}

export default Collapse
