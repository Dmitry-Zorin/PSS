import { Box, HStack, StackProps } from '@chakra-ui/react'
import {
	ColorModeMenu,
	LanguageMenu,
	MainMenuMobile,
	PublicationSearch,
} from 'components'
import resources from 'constants/resources'

export default function AppBar(props: StackProps) {
	return (
		<HStack
			as="header"
			spacing={0}
			justify="flex-end"
			color="text-secondary"
			py={4}
			{...props}
		>
			<Box flexGrow={1}>
				<MainMenuMobile items={resources} />
			</Box>
			<PublicationSearch />
			<ColorModeMenu />
			<LanguageMenu />
		</HStack>
	)
}
