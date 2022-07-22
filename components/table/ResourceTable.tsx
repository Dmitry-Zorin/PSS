import {
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
import { cloneElement, ReactElement } from 'react'

interface ResourceItem extends Record<string, any> {
	id: string | number
}

type ResourceTableProps = {
	data: ResourceItem[]
	fields: string[]
	RowLink?: ReactElement
}

export default function ResourceTable({
	data,
	fields,
	RowLink,
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
								borderColor="inherit"
							>
								{t(field)}
							</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{data?.map((item) => {
						const tableRow = (
							<TableRow>
								{fields.map((field) => (
									<Td
										key={`${item.id} ${field}`}
										isNumeric={typeof item[field] === 'number'}
										borderColor="inherit"
										w="auto"
									>
										<Truncate>{item[field]}</Truncate>
									</Td>
								))}
							</TableRow>
						)
						return RowLink
							? cloneElement(RowLink, {
									key: item.id,
									href: `${RowLink.props.href}/${item.id}`,
									children: tableRow,
							  })
							: tableRow
					})}
				</Tbody>
			</Table>
		</TableContainer>
	)
}
