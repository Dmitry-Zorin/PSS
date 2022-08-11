import { Stack, Text, TextProps } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'

interface LabeledTextProps extends TextProps {
	label: string
	text?: string | number | null
}

export default function LabeledText({
	label,
	text,
	...props
}: LabeledTextProps) {
	const { t } = useTranslation('fields')
	return (
		<Stack>
			<Text fontSize="sm" fontWeight="medium" color="text-secondary">
				{t(label)}
			</Text>
			<Text {...props}>{text || '-'}</Text>
		</Stack>
	)
}
