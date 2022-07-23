import {
	Link,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react'
import { TableRow, Truncate } from 'components'
import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'

interface ResourceItem extends Record<string, any> {
	id: string | number
}

type ResourceTableProps = {
	data: ResourceItem[]
	fields: string[]
	href: string
}

export default function ResourceTable({
	data,
	fields,
	href,
}: ResourceTableProps) {
	const { t } = useTranslation('fields')

	if (!data.length) {
		return null
	}

	return (
		<TableContainer>
			<Table whiteSpace="normal" fontSize={{ base: 'sm', xl: 'md' }}>
				<Thead>
					<Tr>
						{fields.map((field) => (
							<Th
								key={field}
								isNumeric={typeof data[0][field] === 'number'}
								borderColor="border"
							>
								{t(field)}
							</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{data?.map((item) => {
						return (
							<TableRow key={item.id}>
								{fields.map((field, i) => (
									<Td
										key={`${item.id} ${field}`}
										isNumeric={typeof item[field] === 'number'}
										borderColor="border"
										w="auto"
									>
										{i > 0 ? (
											<Truncate>{item[field]}</Truncate>
										) : (
											<NextLink href={`${href}/${item.id}`} passHref>
												<Link as={Truncate}>{item[field]}</Link>
											</NextLink>
										)}
									</Td>
								))}
							</TableRow>
						)
					})}
				</Tbody>
			</Table>
		</TableContainer>
	)
}
