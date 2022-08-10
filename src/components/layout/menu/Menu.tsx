import { Box, BoxProps } from '@chakra-ui/react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { MenuGroup } from 'components'

interface MenuItems extends BoxProps {
	items: Record<string, Record<string, { icon: IconProp }>>
}

export default function Menu({ items, ...props }: MenuItems) {
	return (
		<Box px={{ base: 2, lg: 4 }} w={{ lg: 64 }} {...props}>
			{Object.entries(items).map(([name, info]) => {
				return (
					<MenuGroup
						key={name}
						heading={name === 'main' ? undefined : name}
						items={info}
					/>
				)
			})}
		</Box>
	)
}
