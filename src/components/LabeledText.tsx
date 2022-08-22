import {
	Stack,
	Stat,
	StatLabel,
	StatNumber,
	Text,
	TextProps,
} from '@chakra-ui/react'
import { isString, isNumber } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { ReactElement } from 'react'

interface LabeledTextProps extends TextProps {
	label: string
	text?: ReactElement | string | number | null
	stat?: boolean
}

export default function LabeledText({
	label,
	text,
	stat,
	...props
}: LabeledTextProps) {
	const { t } = useTranslation('resources')
	label = t(`fields.${label}`)
	text ||= '-'

	return stat ? (
		<Stat>
			<StatLabel color="text-secondary">{label}</StatLabel>
			<StatNumber opacity={0.9}>{text}</StatNumber>
		</Stat>
	) : (
		<Stack>
			<Text fontSize="sm" fontWeight="medium" color="text-secondary">
				{label}
			</Text>
			{isString(text) || isNumber(text) ? <Text {...props}>{text}</Text> : text}
		</Stack>
	)
}
