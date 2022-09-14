import { Box, BoxProps } from '@chakra-ui/react'
import { MainMenuGroup } from 'components'
import { ResourceKey, Resources } from 'constants/resources'

export interface MainMenuProps extends BoxProps {
	items: Resources
}

export default function MainMenu({ items, ...props }: MainMenuProps) {
	return (
		<Box w={{ lg: 64 }} px={{ base: 2, lg: 4 }} pt={1} {...props}>
			{Object.entries(items).map(([name, info]) => {
				return (
					<MainMenuGroup
						key={name}
						heading={name === 'main' ? undefined : (name as ResourceKey)}
						info={info}
					/>
				)
			})}
		</Box>
	)
}
