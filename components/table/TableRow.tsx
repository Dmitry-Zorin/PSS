import { forwardRef, TableRowProps, Tr } from '@chakra-ui/react'

const TableRow = forwardRef<TableRowProps, 'tr'>((props, ref) => (
	<Tr
		ref={ref}
		cursor="pointer"
		transitionProperty="background"
		transitionDuration="fast"
		transitionTimingFunction="ease-out"
		_hover={{ bg: 'border' }}
		_active={{ opacity: 0.85 }}
		{...props}
	/>
))

export default TableRow
