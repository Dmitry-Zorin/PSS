import { Tooltip, TooltipProps } from '@chakra-ui/react'
import { isObject, truncate } from 'lodash'
import { cloneElement, ReactElement } from 'react'

const MAX_LENGTH = 400

interface TruncateProps extends Omit<TooltipProps, 'children'> {
	children: ReactElement | string
	maxLength?: number
}

export default function Truncate({
	children,
	maxLength = MAX_LENGTH,
	...props
}: TruncateProps) {
	const hasProps = isObject(children) && 'props' in children
	const text = hasProps ? (children.props?.children as string) : children
	const truncatedText = truncate(text, {
		length: maxLength,
		separator: /\W? /,
	})

	return text.length > maxLength ? (
		<Tooltip
			label={text}
			placement="bottom"
			openDelay={1000}
			maxW="xl"
			{...props}
		>
			{hasProps ? (
				cloneElement(children, { children: truncatedText })
			) : (
				<div tabIndex={0}>{truncatedText}</div>
			)}
		</Tooltip>
	) : hasProps ? (
		children
	) : (
		<>{text}</>
	)
}
