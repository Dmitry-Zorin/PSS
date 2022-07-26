import {
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react'
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	RowData,
	useReactTable,
} from '@tanstack/react-table'
import { TableRow } from 'components'
import { useTruncate } from 'hooks'
import { isNumber } from 'lodash'
import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'

declare module '@tanstack/table-core' {
	interface ColumnMeta<TData extends RowData, TValue> {
		isNumeric?: boolean
	}
}

type Data = Record<string, any>

type ResourceTableProps = {
	data: Data[]
	fields: string[]
	href: string
	sort: (field: string, value?: 'desc' | 'asc') => void
}

export default function ResourceTable({
	data,
	fields,
	href,
	sort,
}: ResourceTableProps) {
	const { t } = useTranslation('fields')
	const truncate = useTruncate()

	const columns: ColumnDef<Data, string>[] = fields.map((field) => ({
		accessorKey: field,
		header: t<string>(field),
		cell: (e) => truncate(e.getValue()),
		meta: {
			isNumeric: isNumber(data[0][field]),
		},
	}))

	const { getHeaderGroups, getRowModel } = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (e) => e.id,
		debugTable: true,
	})

	if (!data.length) {
		return null
	}

	return (
		<TableContainer>
			<Table whiteSpace="normal" fontSize={{ base: 'sm', xl: 'md' }}>
				<Thead>
					{getHeaderGroups().map((headerGroup) => (
						<Tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<Th
									key={header.id}
									isNumeric={header.column.columnDef.meta!.isNumeric}
									borderColor="border"
									cursor="pointer"
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
								</Th>
							))}
						</Tr>
					))}
				</Thead>
				<Tbody>
					{getRowModel().rows.map((row) => (
						<NextLink key={row.id} href={`${href}/${row.id}`}>
							<TableRow>
								{row.getVisibleCells().map((cell) => (
									<Td
										key={cell.id}
										isNumeric={cell.column.columnDef.meta!.isNumeric}
										borderColor="border"
										w="auto"
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Td>
								))}
							</TableRow>
						</NextLink>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	)
}
