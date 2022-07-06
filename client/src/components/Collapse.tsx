import { gentleConfig } from 'components'
import { ReactNode, useRef } from 'react'
import { animated, useSpring, UseSpringProps } from 'react-spring'

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
	const orientations = {
		vertical: {
			height: collapseIn ? ref.current?.offsetHeight || undefined : 0,
		},
		horizontal: {
			width: collapseIn ? ref.current?.offsetWidth || undefined : 0,
		},
	}
	return (
		<animated.div
			style={useSpring({
				...orientations[orientation],
				overflow: 'hidden',
				config: gentleConfig,
				...props,
			})}
		>
			<div ref={ref}>{children}</div>
		</animated.div>
	)
}

export default Collapse
