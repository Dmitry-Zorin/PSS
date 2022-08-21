import { Box, Center, Divider, StackProps, Text } from '@chakra-ui/react'
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
		<Box pt={1} pb={{ base: 3, lg: 0 }}>
			<Divider pt={3} />
			<Center
				display={{ base: 'none', lg: 'flex' }}
				pointerEvents="none"
				h={12}
				pt={1}
				{...props}
			>
				<Text
					fontSize={{ base: 'md', xl: 'sm' }}
					fontWeight="medium"
					color="text-secondary"
				>
					{t(`layout.menu.items.${text}`)}
				</Text>
			</Center>
		</Box>
	)
}
