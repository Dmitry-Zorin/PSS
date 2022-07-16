import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react'
import ColorModeSwitchIcon from './ColorModeSwitchIcon'

export default function ColorModeSwitch() {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<Tooltip label="Toggle Color Mode" placement="auto">
			<IconButton
				aria-label="Toggle Color Mode"
				variant="ghost"
				icon={<ColorModeSwitchIcon showMoon={colorMode === 'light'} />}
				onClick={toggleColorMode}
			/>
		</Tooltip>
	)
}
