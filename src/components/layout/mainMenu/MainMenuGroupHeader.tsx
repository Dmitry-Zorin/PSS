import { Flex, StackProps } from '@chakra-ui/react'
import { Link } from 'components'
import useTranslation from 'next-translate/useTranslation'
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
		<Flex
			as={Link}
			href={`/${text}`}
			display={{ base: 'none', lg: 'flex' }}
			align="center"
			fontSize="sm-"
			color={isActive ? 'primary' : 'text-secondary'}
			fontWeight="semibold"
			letterSpacing="wide"
			borderRadius="lg"
			h={10}
			px={6}
			mt={4}
			_focusVisible={{
				shadow: '0 0 0 2px var(--chakra-colors-primary)',
			}}
			{...props}
		>
			{t(`layout.menu.items.${text}`).toUpperCase()}
		</Flex>
	)
}
