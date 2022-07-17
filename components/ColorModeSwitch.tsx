import { IconButton, useColorMode } from '@chakra-ui/react'
import { ColorModeSwitchIcon } from 'components'

export default function ColorModeSwitch() {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<IconButton
			aria-label="Toggle Color Mode"
			variant="unstyled"
			icon={
				<ColorModeSwitchIcon showMoon={colorMode === 'light'} boxSize={7} />
			}
			onClick={toggleColorMode}
		/>
	)
}
