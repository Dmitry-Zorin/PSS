import {
	ChakraProvider,
	ChakraProviderProps,
	extendTheme,
} from '@chakra-ui/react'
import { createContext, useEffect, useState } from 'react'
import theme from 'theme'
import { isBrowser } from 'utils/env'

interface ContextValue {
	shouldUseSystemColorMode: boolean
	setUseSystemColorMode: (arg: boolean) => void
}

export const SystemColorModeContext = createContext<ContextValue>({
	shouldUseSystemColorMode: true,
	setUseSystemColorMode: (_) => {},
})

export default function ThemeProvider(props: ChakraProviderProps) {
	const [useSystem, setUseSystem] = useState(
		isBrowser && localStorage.getItem('system-color-mode') !== 'false',
	)

	return (
		<SystemColorModeContext.Provider
			value={{
				shouldUseSystemColorMode: useSystem,
				setUseSystemColorMode: (useSystem) => {
					localStorage.setItem('system-color-mode', useSystem.toString())
					setUseSystem(useSystem)
				},
			}}
		>
			<SystemColorModeContext.Consumer>
				{({ shouldUseSystemColorMode }) => (
					<ChakraProvider
						key={shouldUseSystemColorMode.toString()}
						theme={extendTheme(theme, {
							config: {
								useSystemColorMode: shouldUseSystemColorMode,
							},
						})}
						{...props}
					/>
				)}
			</SystemColorModeContext.Consumer>
		</SystemColorModeContext.Provider>
	)
}
