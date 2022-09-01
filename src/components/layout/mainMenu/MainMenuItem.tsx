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

export interface MainMenuItemProps {
	href: string
	icon: IconProp
	text: string
}

export default function MainMenuItem({ href, icon, text }: MainMenuItemProps) {
	const { t } = useTranslation()
	const router = useRouter()
	const isActive = new RegExp(`^${href}($|\\W)`).test(router.asPath)
	const translatedText = t(`layout.menu.items.${text}`)

	return (
		<Tooltip
			label={translatedText}
			placement="right"
			fontWeight="normal"
			hidden={useBreakpointValue({
				base: false,
				lg: true,
			})}
		>
			<ListItem>
				<Link href={href} passHref>
					<HStack
						as="a"
						spacing={3}
						h={10}
						px={{ base: 4, lg: 6 }}
						borderRadius="lg"
						color={isActive ? 'primary' : 'text-secondary'}
						outline="none"
						_hover={{
							color: 'primary',
							bg: 'bg-layer-1',
						}}
						_focusVisible={{
							shadow: '0 0 0 2px var(--chakra-colors-primary)',
						}}
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
							{translatedText}
						</Text>
					</HStack>
				</Link>
			</ListItem>
		</Tooltip>
	)
}
