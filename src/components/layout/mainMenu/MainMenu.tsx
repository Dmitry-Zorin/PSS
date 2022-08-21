import { Box, BoxProps } from '@chakra-ui/react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { MainMenuGroup } from 'components'

export interface MainMenuProps extends BoxProps {
	items: Record<string, Record<string, { icon: IconProp }>>
}

export default function MainMenu({ items, ...props }: MainMenuProps) {
	return (
		<Box px={{ base: 2, lg: 4 }} w={{ lg: 64 }} {...props}>
			{Object.entries(items).map(([name, info]) => {
				return (
					<MainMenuGroup
						key={name}
						heading={name === 'main' ? undefined : name}
						items={info}
					/>
				)
			})}
		</Box>
	)
}
