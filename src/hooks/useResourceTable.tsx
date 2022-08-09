import { Highlight } from '@chakra-ui/react'
import {
	ColumnDef,
	getCoreRowModel,
	RowData,
	useReactTable,
} from '@tanstack/react-table'
import { useTruncate } from 'hooks'
import { useTranslation } from 'next-i18next'

export type useResourceTableProps<Data extends Record<string, any>> = {
	data: Data[]
	fields: (keyof Data & string)[]
	numeric?: (keyof Data & string)[]
	sort: (field: string, value?: 'desc' | 'asc') => void
	search?: string
}

export default function useResourceTable<Data extends Record<string, any>>({
	data,
	fields,
	numeric,
	sort,
	search,
}: useResourceTableProps<Data>) {
	const { t } = useTranslation('fields')
	const truncate = useTruncate()

	const columns: ColumnDef<Data, string>[] = fields.map((field) => ({
		accessorKey: field,
		header: t<string>(field),
		cell: (e) => {
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
			isNumeric: numeric?.includes(field),
		},
	}))

	return useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (e) => e.id,
		debugTable: true,
	})
}

declare module '@tanstack/table-core' {
	interface ColumnMeta<TData extends RowData, TValue> {
		isNumeric?: boolean
	}
}
