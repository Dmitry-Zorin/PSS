import { Badge, Wrap, WrapItem, WrapProps } from '@chakra-ui/react'
import { GetPublicationResponse } from 'server/services/publication'

interface AuthorTagsProps extends WrapProps {
	authors: GetPublicationResponse['authors']
	coauthors: GetPublicationResponse['coauthors']
}

export default function AuthorTags({
	authors,
	coauthors,
	...props
}: AuthorTagsProps) {
	return (
		<Wrap {...props}>
			{authors.map((e) => (
				<WrapItem key={e.id}>
					<Badge>{e.fullName}</Badge>
				</WrapItem>
			))}
			{coauthors.map((name) => (
				<WrapItem key={name}>
					<Badge>{name}</Badge>
				</WrapItem>
			))}
		</Wrap>
	)
}
