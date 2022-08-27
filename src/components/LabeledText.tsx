import {
	Stack,
	StackProps,
	Stat,
	StatLabel,
	StatNumber,
	StatProps,
	Text,
} from '@chakra-ui/react'
import { isNumber, isString } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { ReactElement } from 'react'

interface LabeledTextProps {
	label: string
	text?: ReactElement | string | number
	stat?: boolean
}

export default function LabeledText({
	label,
	text,
	stat,
	...props
}: LabeledTextProps & StackProps & StatProps) {
	const { t } = useTranslation('resources')
	label = t(`fields.${label}`)
	text ||= '-'

	return stat ? (
		<Stat {...props}>
			<StatLabel color="text-secondary">{label}</StatLabel>
			<StatNumber opacity={0.9}>{text}</StatNumber>
		</Stat>
	) : (
		<Stack {...props}>
			<Text fontSize="sm" fontWeight="medium" color="text-secondary">
				{label}
			</Text>
			{isString(text) || isNumber(text) ? <Text>{text}</Text> : text}
		</Stack>
	)
}
