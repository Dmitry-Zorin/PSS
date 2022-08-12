import { useColorMode } from '@chakra-ui/react'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { Icon, IconButton } from 'components'
import useTranslation from 'next-translate/useTranslation'

export default function ColorModeSwitch() {
	const { t } = useTranslation()
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<IconButton
			aria-label={t('labels.color_mode_switch')}
			icon={<Icon icon={colorMode === 'dark' ? faSun : faMoon} boxSize={5} />}
			onClick={toggleColorMode}
		/>
	)
}
