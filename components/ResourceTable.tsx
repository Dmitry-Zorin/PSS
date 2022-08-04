import {
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react'
import { flexRender } from '@tanstack/react-table'
import { useResourceTable } from 'hooks'
import { useResourceTableProps } from 'hooks/useResourceTable'
import { useRouter } from 'next/router'

interface ResourceTableProps<Data extends Record<string, any>>
	extends useResourceTableProps<Data> {
	href: string
}

export default function ResourceTable<Data extends Record<string, any>>({
	href,
	...tableProps
}: ResourceTableProps<Data>) {
	const router = useRouter()

	const { getHeaderGroups, getRowModel } = useResourceTable(tableProps)

	return (
		<TableContainer>
			<Table whiteSpace="normal" fontSize={{ base: 's', xl: 'md' }}>
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
