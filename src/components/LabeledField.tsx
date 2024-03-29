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

export interface LabeledFieldProps {
	label: string
	text?: ReactElement | string | number
	stat?: boolean
	skipTranslation?: boolean
}

export default function LabeledField({
	label,
	text,
	stat,
	skipTranslation,
	...props
}: LabeledFieldProps & StackProps & StatProps) {
	const { t } = useTranslation('resources')
	label = skipTranslation ? label : t(`fields.${label}`)
	text = text === '' ? '-' : text

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
