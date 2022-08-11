import { Box, HStack, StackProps } from '@chakra-ui/react'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { ColorModeSwitch, Icon, IconButton, UserMenu } from 'components'
import useTranslation from 'next-translate/useTranslation'

interface AppBarProps extends StackProps {
	onMenuDrawerOpen: () => void
}

export default function AppBar({ onMenuDrawerOpen, ...props }: AppBarProps) {
	const { t } = useTranslation('common')
	return (
		<HStack
			spacing={0}
			justify="flex-end"
			color="text-tertiary"
			p={4}
			{...props}
		>
			<Box display={{ base: 'block', md: 'none' }} flexGrow={1}>
				<IconButton
					aria-label={t('labels.menu')}
					icon={<Icon icon={faBars} boxSize={5} />}
					onClick={onMenuDrawerOpen}
				/>
			</Box>
			<ColorModeSwitch />
			<UserMenu />
		</HStack>
	)
}
