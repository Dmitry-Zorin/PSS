import {
	HStack,
	ListItem,
	Text,
	Tooltip,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Icon } from 'components'
import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export interface MenuItemProps {
	to: string
	icon: IconProp
	text: string
}

export default function MenuItem({ to, icon, text }: MenuItemProps) {
	const router = useRouter()
	const { isOpen: isActive, onOpen } = useDisclosure({
		defaultIsOpen: to.startsWith('/publications')
			? false
			: new RegExp(`^${to}($|\/)`).test(router.asPath),
	})
	const { t } = useTranslation('common', { keyPrefix: 'menu.items' })

	useEffect(() => {
		const { category } = router.query
		if (category && new RegExp(`/${category}($|\/)`).test(to)) {
			onOpen()
		}
	}, [onOpen, router.query, to])

	return (
		<Tooltip
			label={t(text)}
			placement="right"
			fontWeight="normal"
			hidden={useBreakpointValue({
				base: true,
				md: false,
				lg: true,
			})}
		>
			<ListItem>
				<NextLink href={to} passHref>
					<HStack
						as="a"
						spacing={3}
						h={10}
						px={{ base: 4, lg: 6, xl: 8 }}
						fontSize="md"
						borderRadius="lg"
						color={isActive ? 'text-primary' : 'text-secondary'}
						outline="2px solid transparent"
						_hover={{
							color: 'text-primary',
							bg: 'bg-layer-2',
						}}
						_focusVisible={{ shadow: 'outline' }}
					>
						<Icon icon={icon} />
						<Text
							display={{
								base: 'block',
								md: 'none',
								lg: 'block',
							}}
						>
							{t(text)}
						</Text>
					</HStack>
				</NextLink>
			</ListItem>
		</Tooltip>
	)
}
