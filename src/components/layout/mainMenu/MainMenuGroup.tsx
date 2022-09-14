import { List } from '@chakra-ui/react'
import { MainMenuGroupHeader, MainMenuItem } from 'components'
import { ResourceKey, ResourceValue } from 'constants/resources'

export interface MainMenuGroupProps {
	heading?: ResourceKey
	info: ResourceValue
}

export default function MainMenuGroup({ heading, info }: MainMenuGroupProps) {
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
						icon={'icon' in info ? info.icon : undefined}
						mt={4}
					/>
				)}
				{Object.entries(info.items).map(([name, info]) => {
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
