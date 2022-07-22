import { forwardRef, TableRowProps, Tr } from '@chakra-ui/react'

const TableRow = forwardRef<TableRowProps, 'tr'>((props, ref) => (
	<Tr
		ref={ref}
		cursor="pointer"
		transitionProperty="background"
		transitionDuration="fast"
		transitionTimingFunction="ease-out"
		_hover={{ bg: 'bg-50' }}
		_active={{ bg: 'bg-100' }}
		{...props}
	/>
))

export default TableRow
