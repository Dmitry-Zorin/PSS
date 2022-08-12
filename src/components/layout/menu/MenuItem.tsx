import {
	HStack,
	ListItem,
	Text,
	Tooltip,
	useBreakpointValue,
} from '@chakra-ui/react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Icon } from 'components'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useRouter } from 'next/router'

export interface MenuItemProps {
	to: string
	icon: IconProp
	text: string
}

export default function MenuItem({ to, icon, text }: MenuItemProps) {
	const { t } = useTranslation()
	const router = useRouter()
	const isActive = new RegExp(`^${to}($|\/)`).test(router.asPath)

	return (
		<Tooltip
			label={t(`menu.items.${text}`)}
			placement="right"
			fontWeight="normal"
			hidden={useBreakpointValue({
				base: true,
				md: false,
				lg: true,
			})}
		>
			<ListItem>
				<Link href={to} passHref>
					<HStack
						as="a"
						spacing={3}
						h={10}
						px={{ base: 4, lg: 6 }}
						borderRadius="lg"
						color={isActive ? 'text-primary' : 'text-secondary'}
						outline="2px solid transparent"
						_hover={{
							color: 'text-primary',
							bg: 'bg-layer-2',
						}}
						_focusVisible={{ shadow: 'outline' }}
					>
						<Icon icon={icon} boxSize="1.125rem" />
						<Text
							fontSize="md"
							display={{
								base: 'block',
								md: 'none',
								lg: 'block',
							}}
						>
							{t(`menu.items.${text}`)}
						</Text>
					</HStack>
				</Link>
			</ListItem>
		</Tooltip>
	)
}
