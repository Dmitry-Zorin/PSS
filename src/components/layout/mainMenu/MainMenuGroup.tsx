import { List } from '@chakra-ui/react'
import { MainMenuGroupHeader, MainMenuItem } from 'components'

export interface MainMenuGroupProps {
	heading?: string
	items: Record<string, any>
}

export default function MainMenuGroup({ heading, items }: MainMenuGroupProps) {
	return (
		<>
			{heading && <MainMenuGroupHeader text={heading} />}
			<List>
				{heading && (
					<MainMenuItem
						heading
						display={{ base: 'block', lg: 'none' }}
						href={`/${heading}`}
						text={heading}
						icon={items._metadata.icon}
						mt={4}
					/>
				)}
				{Object.entries(items).map(([name, info]) => {
					if (name.startsWith('_')) {
						return undefined
					}
					return (
						<MainMenuItem
							key={name}
							href={`${heading ? `/${heading.toLowerCase()}` : ''}/${name}`}
							text={name}
							icon={info.icon}
						/>
					)
				})}
			</List>
		</>
	)
}
