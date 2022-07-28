import { IconButton, useColorMode } from '@chakra-ui/react'
import { ColorModeSwitchIcon } from 'components'

export default function ColorModeSwitch() {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<IconButton
			aria-label="Toggle Color Mode"
			icon={
				<ColorModeSwitchIcon showMoon={colorMode === 'light'} boxSize={6} />
			}
			onClick={toggleColorMode}
		/>
	)
}
