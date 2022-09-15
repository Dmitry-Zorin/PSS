import {
	DragControls,
	Reorder,
	useDragControls,
	useMotionValue,
} from 'framer-motion'
import { ComponentProps, ReactNode, useEffect, useState } from 'react'

interface ReorderItemProps
	extends Omit<ComponentProps<typeof Reorder.Item>, 'children'> {
	children: (opts: {
		dragControls: DragControls
		isActive: boolean
	}) => ReactNode
}

export default function ReorderItem({ children, ...props }: ReorderItemProps) {
	const dragControls = useDragControls()
	const y = useMotionValue(0)
	const [isActive, setIsActive] = useState(false)

	useEffect(() => {
		y.onChange((value) => {
			setIsActive(value !== 0)
		})
	}, [y])

	return (
		<Reorder.Item
			dragListener={false}
			dragControls={dragControls}
			style={{ y, position: 'relative' }}
			{...props}
		>
			{children({ dragControls, isActive })}
		</Reorder.Item>
	)
}
