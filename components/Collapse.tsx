import { Box, BoxProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { gentleSpringConfig } from 'utils'

type Orientation = 'vertical' | 'horizontal'

interface CollapseProps extends BoxProps {
	in: boolean
	orientation?: Orientation
}

const Collapse = ({
	in: collapseIn,
	orientation = 'vertical',
	...props
}: CollapseProps) => {
	const property = orientation === 'vertical' ? 'height' : 'width'

	return (
		<Box
			as={motion.div}
			overflow="hidden"
			initial={false}
			animate={{
				[property]: collapseIn ? 'auto' : 0,
				opacity: +collapseIn,
				transition: gentleSpringConfig,
			}}
			{...props}
		/>
	)
}

export default Collapse
