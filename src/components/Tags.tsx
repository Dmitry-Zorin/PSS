import { Badge, HStack, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { Icon } from 'components'
import { useTags } from 'hooks'

export default function Tags() {
	const tags = useTags()

	return tags.length ? (
		<Wrap spacing={3} pt={1} pb={3}>
			{tags.map((tag) => (
				<WrapItem key={tag.text}>
					<Badge
						fontSize="sm"
						cursor="pointer"
						_hover={{ bg: 'bg-layer-1' }}
						onClick={tag.onClick}
					>
						<HStack spacing={1}>
							<Text>{tag.text}</Text>
							<Icon icon={faClose} />
						</HStack>
					</Badge>
				</WrapItem>
			))}
		</Wrap>
	) : null
}
