import { Box, Highlight, SkeletonText } from '@chakra-ui/react'
import {
	ColumnDef,
	getCoreRowModel,
	RowData,
	useReactTable,
} from '@tanstack/react-table'
import { useTruncate } from 'hooks'
import { range } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

export type useResourceTableProps<Data extends Record<string, any>> = {
	data: Data[] | undefined
	fields: (keyof Data & string)[]
	numeric?: (keyof Data & string)[]
	skeletonPattern?: Partial<Data>
	sort: (field: string, value?: 'desc' | 'asc') => void
	search?: string
}

export default function useResourceTable<Data extends Record<string, any>>({
	data: newData,
	fields,
	numeric,
	skeletonPattern,
	sort,
	search,
}: useResourceTableProps<Data>) {
	const { t } = useTranslation('fields')
	const truncate = useTruncate()
	const [data, setData] = useState<Data[]>([
		...range(9).map((i) => ({ id: (~i).toString() } as any)),
		{ id: '0', ...skeletonPattern },
	])

	useEffect(() => {
		if (newData) {
			setData(newData)
		}
	}, [newData])

	const columns: ColumnDef<Data, string>[] = fields.map((field) => ({
		accessorKey: field,
		header: t<string>(field),
		cell: (e) => {
			if (+e.row.id < 0) {
				return <SkeletonText noOfLines={numeric?.includes(field) ? 1 : 5} />
			}
			if (e.row.id === '0') {
				return <Box opacity={0}>{e.getValue()}</Box>
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
