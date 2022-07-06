import {
	cloneElement,
	forwardRef,
	HTMLAttributes,
	MutableRefObject,
	ReactElement,
	useEffect,
	useRef,
	useState,
} from 'react'
import { SpringConfig, useSpring } from 'react-spring'
import { gentleConfig } from './spring'

type Side = 'left' | 'right' | 'top' | 'bottom'

interface SlideProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactElement
	in: boolean
	from: Side
	config?: SpringConfig
	onStart?: () => void
	onRest?: () => void
	onEnter?: () => void
	onExited?: () => void
}

const Slide = forwardRef<HTMLDivElement, SlideProps>(
	(
		{
			children,
			in: slideIn,
			from,
			config,
			onStart,
			onRest,
			onEnter,
			onExited,
			...props
		},
		ref,
	) => {
		const childrenRef = useRef<HTMLDivElement>()
		const [distance, setDistance] = useState(0)
		const [visibility, setVisibility] = useState('hidden')

		const horizontal = ['left', 'right'].includes(from)
		const vertical = ['top', 'bottom'].includes(from)
		const param = horizontal ? 'x' : 'y'

		useEffect(() => {
			const el = childrenRef.current
			if (!el) return

			const rect = el.getBoundingClientRect()

			if (horizontal) {
				const offset = rect[from] - +(from === 'right') * rect.left
				setDistance((-1) ** +(from === 'left') * (rect.width + offset))
			}

			if (vertical) {
				const offset = rect[from] - +(from === 'bottom') * rect.top
				setDistance((-1) ** +(from === 'top') * (rect.height + offset))
			}
		}, [childrenRef, from, horizontal, vertical])

		return cloneElement(children, {
			ref: (node: HTMLDivElement) => {
				childrenRef.current = node
				if (typeof ref === 'function') {
					ref(node)
				} else if (ref) {
					;(ref as MutableRefObject<HTMLDivElement>).current = node
				}
			},
			style: useSpring({
				visibility,
				[param]: slideIn ? 0 : distance,
				from: {
					[param]: distance,
				},
				config: config || gentleConfig,
				onStart: () => {
					setVisibility('visible')
					onStart?.()
					if (slideIn) {
						onEnter?.()
					}
				},
				onRest: () => {
					onRest?.()
					if (!slideIn) {
						onExited?.()
					}
				},
			}),
			...props,
		})
	},
)

export default Slide
