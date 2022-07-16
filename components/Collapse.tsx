import { Box, useDimensions } from '@chakra-ui/react'
import type { UseSpringProps } from '@react-spring/web'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { gentleSpringConfig } from 'utils'

type Orientation = 'vertical' | 'horizontal'

type CollapseProps = UseSpringProps & {
	children: ReactNode
	in: boolean
	orientation?: Orientation
}

const Collapse = ({
	children,
	in: collapseIn,
	orientation = 'vertical',
	...props
}: CollapseProps) => {
	const ref = useRef<HTMLDivElement>(null)
	const dimensions = useDimensions(ref)

	const property = orientation === 'vertical' ? 'height' : 'width'

	return (
		<Box
			as={motion.div}
			overflow="hidden"
			initial={false}
			animate={{
				[property]: collapseIn ? dimensions?.borderBox[property] : 0,
				transition: gentleSpringConfig,
			}}
		>
			<div ref={ref}>{children}</div>
		</Box>
	)
}

export default Collapse
