import { List, ListProps } from '@chakra-ui/react'
import { Pagination } from 'components'

interface MainListProps extends ListProps {
	total: number
}

export default function MainList({ children, total, ...props }: MainListProps) {
	return (
		<>
			<List
				borderBottom="1px"
				borderColor="border"
				pt={4}
				sx={{
					'> li': {
						borderTop: '1px',
						borderColor: 'border',
						px: { base: 1, sm: 2 },
						py: 3,
						_hover: { bg: 'bg-layer-1' },
					},
				}}
				{...props}
			>
				{children}
			</List>
			<Pagination total={total} />
		</>
	)
}
