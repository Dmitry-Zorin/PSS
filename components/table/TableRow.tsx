import { forwardRef, TableRowProps, Tr } from '@chakra-ui/react'

const TableRow = forwardRef<TableRowProps, 'tr'>((props, ref) => (
	<Tr
		ref={ref}
		cursor="pointer"
		transitionProperty="background"
		transitionDuration="fast"
		transitionTimingFunction="ease-out"
		_hover={{ bg: 'bg-layer-1' }}
		_active={{ bg: 'bg-layer-2' }}
		{...props}
	/>
))

export default TableRow
