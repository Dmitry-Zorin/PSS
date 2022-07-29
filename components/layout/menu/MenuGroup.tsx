import { Box, Divider, List } from '@chakra-ui/react'
import { MenuGroupHeader, MenuItem } from 'components'

export interface MenuGroupProps {
	heading?: string
	items: Record<string, any>
}

export default function MenuGroup({ heading, items }: MenuGroupProps) {
	return (
		<Box>
			<Box px={{ base: 1, lg: 2 }} pt={heading ? 2 : 0} pb={2}>
				<Divider />
				{heading && (
					<Box display={{ base: 'none', lg: 'block' }}>
						<MenuGroupHeader text={heading} />
						<Divider />
					</Box>
				)}
			</Box>
			<List>
				{Object.entries(items).map(([name, info]) => {
					return (
						<MenuItem
							key={name}
							to={`${heading ? `/${heading.toLowerCase()}` : ''}/${name}`}
							text={name}
							icon={info.icon}
						/>
					)
				})}
			</List>
		</Box>
	)
}
