import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { ColorModeSwitchIcon } from 'components'

export default function ColorModeSwitch() {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<IconButton
			aria-label="Toggle Color Mode"
			variant="unstyled"
			borderRadius="full"
			icon={
				<ColorModeSwitchIcon showMoon={colorMode === 'light'} boxSize={6} />
			}
			onClick={toggleColorMode}
		/>
	)
}
