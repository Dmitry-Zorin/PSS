import {
	Highlight,
	SkeletonText,
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
import { useTruncate } from 'hooks'
import { isNumber } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

declare module '@tanstack/table-core' {
	interface ColumnMeta<TData extends RowData, TValue> {
		isNumeric?: boolean
	}
}

type Data = Record<string, any>

type ResourceTableProps = {
	data: Data[] | undefined
	fields: string[]
	href: string
	sort: (field: string, value?: 'desc' | 'asc') => void
	search?: string
}

export default function ResourceTable({
	data: newData,
	fields,
	href,
	sort,
	search,
}: ResourceTableProps) {
	const { t } = useTranslation('fields')
	const router = useRouter()
	const truncate = useTruncate()
	const [data, setData] = useState<Data[]>([])

	useEffect(() => {
		setData(newData || Array(10).fill({}))
	}, [newData])

	const columns: ColumnDef<Data, string>[] = fields.map((field) => ({
		accessorKey: field,
		header: t<string>(field),
		cell: (e) => {
			if (!newData) {
				return <SkeletonText noOfLines={5} />
			}
			const text = truncate(e.getValue())
			return search ? (
				<Highlight
					query={search?.split(' ')}
					styles={{
						bg: 'primary',
						color: 'bg',
						fontWeight: 'medium',
						borderRadius: 'sm',
					}}
				>
					{text}
				</Highlight>
			) : (
				text
			)
		},
		meta: {
			isNumeric: isNumber(data?.[0]?.[field]),
		},
	}))

	const { getHeaderGroups, getRowModel } = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (e) => e.id,
		debugTable: true,
	})

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
						<Tr
							key={row.id}
							cursor="pointer"
							transitionProperty="background"
							transitionDuration="fast"
							transitionTimingFunction="ease-out"
							_hover={{ bg: 'bg-layer-1' }}
							_active={{ bg: 'bg-layer-2' }}
							onClick={() => router.push(`${href}/${row.id}`)}
						>
							{row.getVisibleCells().map((cell, i) => (
								<Td
									key={cell.id}
									isNumeric={cell.column.columnDef.meta!.isNumeric}
									borderColor="border"
									w="auto"
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</Td>
							))}
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	)
}
