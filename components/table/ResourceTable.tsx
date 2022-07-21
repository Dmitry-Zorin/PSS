import {
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tooltip,
	Tr,
} from '@chakra-ui/react'
import { TableRow } from 'components'
import { truncate } from 'lodash'
import { useTranslation } from 'next-i18next'
import { cloneElement, ReactElement } from 'react'

const MAX_LENGTH = 200

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
								{fields.map((field) => {
									const text = item[field]
									const td = (
										<Td
											key={`${item.id} ${field}`}
											isNumeric={typeof text === 'number'}
											borderColor="inherit"
											w="auto"
										>
											{truncate(text, { length: MAX_LENGTH })}
										</Td>
									)
									return text.length > MAX_LENGTH ? (
										<Tooltip
											label={text}
											placement="bottom"
											openDelay={600}
											px={4}
											py={3}
										>
											{td}
										</Tooltip>
									) : (
										td
									)
								})}
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
