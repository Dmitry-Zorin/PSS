import { useBoolean, useColorMode } from '@chakra-ui/react'
import { ColorModeSwitchIcon, IconButton } from 'components'

export default function ColorModeSwitch() {
	const { colorMode, toggleColorMode } = useColorMode()
	const [showMoon2, { toggle: toggle2 }] = useBoolean()

	return (
		<IconButton
			aria-label="Toggle Color Mode"
			icon={
				<ColorModeSwitchIcon
					// showMoon={showMoon2}
					showMoon={colorMode === 'light'}
				/>
			}
			onClick={toggleColorMode}
			// onClick={toggle2}
		/>
	)
}
