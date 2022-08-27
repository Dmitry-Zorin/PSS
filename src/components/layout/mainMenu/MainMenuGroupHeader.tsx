import { Box, Flex, StackProps, Text } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'

export interface MainMenuGroupHeaderProps extends StackProps {
	text: string
}

export default function MainMenuGroupHeader({
	text,
	...props
}: MainMenuGroupHeaderProps) {
	const { t } = useTranslation()

	return (
		<Box pt={{ base: 4, lg: 2 }}>
			<Flex
				display={{ base: 'none', lg: 'flex' }}
				align="center"
				pl={6}
				h={12}
				pt={2}
				{...props}
			>
				<Text
					fontSize="sm-"
					color="text-secondary"
					fontWeight="semibold"
					letterSpacing="wide"
					pointerEvents="none"
				>
					{t(`layout.menu.items.${text}`).toUpperCase()}
				</Text>
			</Flex>
		</Box>
	)
}
