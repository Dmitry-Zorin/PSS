import { Highlight as ChakraHighlight } from '@chakra-ui/react'

interface HighlightProps {
	text: string
	search?: string
}

export default function Highlight({ text, search }: HighlightProps) {
	return search ? (
		<ChakraHighlight
			query={search?.split(' ')}
			styles={{
				bg: 'primary',
				color: 'bg',
				fontWeight: 'medium',
				borderRadius: 'sm',
			}}
		>
			{text}
		</ChakraHighlight>
	) : (
		<>{text}</>
	)
}
