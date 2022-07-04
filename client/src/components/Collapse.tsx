import { gentleConfig } from 'components'
import { ReactElement, useRef } from 'react'
import { animated, useSpring } from 'react-spring'

interface CollapseProps {
	children: ReactElement | ReactElement[]
	in: boolean
}

const Collapse = ({ children, in: collapseIn }: CollapseProps) => {
	const ref = useRef<HTMLDivElement>(null)

	const style = useSpring({
		height: collapseIn ? ref.current?.offsetHeight || undefined : 0,
		overflow: 'hidden',
		config: gentleConfig,
	})

	return (
		<animated.div style={style}>
			<div ref={ref}>{children}</div>
		</animated.div>
	)
}

export default Collapse
