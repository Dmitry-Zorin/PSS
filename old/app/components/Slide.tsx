import type { SpringConfig } from '@react-spring/web'
import { useSpring } from '@react-spring/web'
import type { HTMLAttributes, MutableRefObject, ReactElement } from 'react'
import { cloneElement, forwardRef, useEffect, useRef, useState } from 'react'
import { gentleConfig } from './spring'

type Side = 'left' | 'right' | 'top' | 'bottom'

interface SlideProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactElement
	in?: boolean
	from: Side
	config?: SpringConfig
	delay?: number
	onStart?: () => void
	onRest?: () => void
	onEnter?: () => void
	onExited?: () => void
}

const Slide = forwardRef<HTMLDivElement, SlideProps>(
	(
		{
			children,
			in: slideIn = true,
			from,
			config,
			delay,
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
				const offset =
					from === 'left'
						? rect.left
						: document.documentElement.clientWidth - rect.right
				setDistance((-1) ** +(from === 'left') * (rect.width + offset))
			}

			if (vertical) {
				const offset =
					from === 'top'
						? rect.top
						: document.documentElement.clientHeight - rect.bottom
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
			style: {
				...useSpring({
					visibility,
					immediate: true,
				}),
				...useSpring({
					[param]: slideIn ? 0 : distance,
					from: {
						[param]: distance,
					},
					config: config || gentleConfig,
					delay,
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
				...children.props.style,
			},
			...props,
		})
	},
)

export default Slide
