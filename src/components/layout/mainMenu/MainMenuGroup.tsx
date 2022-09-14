import { Box, Divider, List } from '@chakra-ui/react'
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
				{heading && 'icon' in info && (
					<Box display={{ base: 'block', lg: 'none' }}>
						<MainMenuItem
							heading
							href={`/${heading}`}
							text={heading}
							icon={info.icon}
							mt={4}
						/>
						<Divider w={7} mx="auto" my={1} />
					</Box>
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
