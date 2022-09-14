import { Avatar, HStack } from '@chakra-ui/react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Icon, LabeledField } from 'components'
import { capitalize } from 'lodash'
import { LabeledFieldProps } from './LabeledField'

interface SearchInfoItemProps extends LabeledFieldProps {
	label: string
	text: string | number
	icon: IconProp
}

export default function SearchInfoItem({
	label,
	text,
	icon,
	...props
}: SearchInfoItemProps) {
	return (
		<HStack spacing={3} flexGrow={1}>
			<Avatar color="bg" icon={<Icon icon={icon} boxSize={6} />} />
			<LabeledField
				stat
				skipTranslation
				label={capitalize(label)}
				text={text}
				{...props}
			/>
		</HStack>
	)
}
