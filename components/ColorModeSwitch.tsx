import { IconButton, useColorMode } from '@chakra-ui/react'
import ColorModeSwitchIcon from './ColorModeSwitchIcon'

export default function ColorModeSwitch() {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<IconButton
			aria-label="Toggle Color Mode"
			variant="ghost"
			icon={<ColorModeSwitchIcon showMoon={colorMode === 'light'} />}
			onClick={toggleColorMode}
			bg="transparent !important"
		/>
	)
}
