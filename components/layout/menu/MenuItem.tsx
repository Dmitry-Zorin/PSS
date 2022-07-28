import {
	HStack,
	ListItem,
	Text,
	Tooltip,
	useBreakpointValue,
} from '@chakra-ui/react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Icon } from 'components'
import { useTranslation } from 'next-i18next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export interface MenuItemProps {
	to: string
	icon: IconProp
	text: string
}

export default function MenuItem({ to, icon, text }: MenuItemProps) {
	const router = useRouter()
	const isActive = new RegExp(`^${to}($|\/)`).test(router.asPath)
	const { t } = useTranslation('common', { keyPrefix: 'menu.items' })

	return (
		<Tooltip
			label={t(text)}
			placement="right"
			fontWeight="normal"
			hidden={useBreakpointValue({
				base: false,
				lg: true,
			})}
		>
			<ListItem>
				<NextLink href={to} passHref>
					<HStack
						as="a"
						spacing={3}
						h={10}
						px={4}
						fontSize="md"
						borderRadius="lg"
						color={isActive ? 'text-primary' : 'text-secondary'}
						outline="2px solid transparent"
						_hover={{ color: isActive ? 'text-primary' : 'text' }}
						_focusVisible={{ shadow: 'outline' }}
					>
						<Icon icon={icon} boxSize={5} />
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
