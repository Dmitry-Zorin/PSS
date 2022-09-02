import { Box, Flex, StackProps } from '@chakra-ui/react'
import { Link } from 'components'
import useTranslation from 'next-translate/useTranslation'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export interface MainMenuGroupHeaderProps extends StackProps {
	text: string
}

export default function MainMenuGroupHeader({
	text,
	...props
}: MainMenuGroupHeaderProps) {
	const { t } = useTranslation()

	const router = useRouter()
	const isActive = new RegExp(`^/${text}($|\\?)`).test(router.asPath)

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
				<Link
					href={`/${text}`}
					fontSize="sm-"
					color={isActive ? 'primary' : 'text-secondary'}
					fontWeight="semibold"
					letterSpacing="wide"
					pointerEvents={text === 'publications' ? undefined : 'none'}
				>
					{t(`layout.menu.items.${text}`).toUpperCase()}
				</Link>
			</Flex>
		</Box>
	)
}
