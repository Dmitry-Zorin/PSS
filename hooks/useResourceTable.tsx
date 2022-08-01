import { Highlight, SkeletonText } from '@chakra-ui/react'
import {
	ColumnDef,
	getCoreRowModel,
	RowData,
	useReactTable,
} from '@tanstack/react-table'
import { useTruncate } from 'hooks'
import { isNumber } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

export type useResourceTableProps<Data extends Record<string, any>> = {
	data: Data[] | undefined
	fields: (keyof Data & string)[]
	sort: (field: string, value?: 'desc' | 'asc') => void
	search?: string
}

export default function useResourceTable<Data extends Record<string, any>>({
	data: newData,
	fields,
	sort,
	search,
}: useResourceTableProps<Data>) {
	const { t } = useTranslation('fields')
	const truncate = useTruncate()
	const [data, setData] = useState<Data[]>([])

	useEffect(() => {
		setData(newData || Array(5).fill({}))
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
