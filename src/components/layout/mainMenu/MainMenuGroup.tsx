import { Box, List } from '@chakra-ui/react'
import { MainMenuGroupHeader, MainMenuItem } from 'components'

export interface MainMenuGroupProps {
	heading?: string
	items: Record<string, any>
}

export default function MainMenuGroup({ heading, items }: MainMenuGroupProps) {
	return (
		<Box>
			{heading && <MainMenuGroupHeader text={heading} />}
			<List>
				{Object.entries(items).map(([name, info]) => {
					return (
						<MainMenuItem
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
