import { Badge, HStack, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { Icon, LabeledField } from 'components'
import { useTags } from 'hooks'
import useTranslation from 'next-translate/useTranslation'

export default function Tags() {
	const { t } = useTranslation()
	const tags = useTags()

	return tags.length ? (
		<LabeledField
			skipTranslation
			label={t('messages.searchFilters')}
			text={
				<Wrap spacing={3}>
					{tags.map((tag) => (
						<WrapItem key={tag.text}>
							<Badge
								fontSize="sm"
								cursor="pointer"
								_hover={{ bg: 'bg-layer-1' }}
								onClick={tag.remove}
							>
								<HStack spacing={1}>
									<Text>{tag.text}</Text>
									<Icon icon={faClose} />
								</HStack>
							</Badge>
						</WrapItem>
					))}
				</Wrap>
			}
		/>
	) : null
}
