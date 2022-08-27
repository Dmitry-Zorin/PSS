import { Box, Divider, Flex, StackProps, Text } from '@chakra-ui/react'
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
		<Box pt={4} pb={{ base: 3, lg: 0 }}>
			<Divider />
			<Flex
				align="center"
				pl={6}
				display={{ base: 'none', lg: 'flex' }}
				pointerEvents="none"
				h={12}
				pt={2}
				{...props}
			>
				<Text
					fontSize="sm-"
					color="text-secondary"
					fontWeight="semibold"
					letterSpacing="wide"
				>
					{t(`layout.menu.items.${text}`).toUpperCase()}
				</Text>
			</Flex>
		</Box>
	)
}
