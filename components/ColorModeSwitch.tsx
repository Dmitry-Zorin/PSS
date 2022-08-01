import { useColorMode } from '@chakra-ui/react'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { Icon, IconButton } from 'components'
import { useTranslation } from 'next-i18next'

export default function ColorModeSwitch() {
	const { t } = useTranslation('common', { keyPrefix: 'labels' })
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<IconButton
			aria-label={t('color_mode_switch')}
			icon={<Icon icon={colorMode === 'light' ? faSun : faMoon} boxSize={5} />}
			onClick={toggleColorMode}
		/>
	)
}
