import { Stack, Text, TextProps } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

interface LabeledTextProps extends TextProps {
	children: ReactNode
	label: string
}

export default function LabeledText({
	children,
	label,
	...props
}: LabeledTextProps) {
	const { t } = useTranslation('fields')
	return (
		<Stack>
			<Text fontSize="sm" color="text-secondary">
				{t(label)}
			</Text>
			<Text {...props}>{children}</Text>
		</Stack>
	)
}
