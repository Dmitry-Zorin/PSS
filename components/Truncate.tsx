import { Tooltip, TooltipProps } from '@chakra-ui/react'
import { truncate } from 'lodash'
import { cloneElement, ReactElement } from 'react'

const MAX_LENGTH = 400

interface TruncateProps extends Omit<TooltipProps, 'children'> {
	children: ReactElement
	maxLength?: number
}

export default function Truncate({
	children,
	maxLength = MAX_LENGTH,
	...props
}: TruncateProps) {
	const text = children.props?.children || children
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
			{children.props ? (
				cloneElement(children, { children: truncatedText })
			) : (
				<div tabIndex={0}>{truncatedText}</div>
			)}
		</Tooltip>
	) : (
		children || <>{text}</>
	)
}
