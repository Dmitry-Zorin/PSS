import {
	ChakraProvider,
	ChakraProviderProps,
	extendTheme,
} from '@chakra-ui/react'
import { createContext, useState } from 'react'
import theme from 'theme'
import { isBrowser } from 'utils/env'

interface ContextValue {
	useSystemColorMode: boolean
	setUseSystemColorMode: (arg: boolean) => void
}

export const SystemColorModeContext = createContext<ContextValue>({
	useSystemColorMode: true,
	setUseSystemColorMode: (_) => {},
})

export default function ThemeProvider(props: ChakraProviderProps) {
	const [useSystem, setUseSystem] = useState(
		isBrowser && localStorage.getItem('system-color-mode') !== 'false',
	)

	return (
		<SystemColorModeContext.Provider
			value={{
				useSystemColorMode: useSystem,
				setUseSystemColorMode: (useSystem) => {
					localStorage.setItem('system-color-mode', useSystem.toString())
					setUseSystem(useSystem)
				},
			}}
		>
			<SystemColorModeContext.Consumer>
				{({ useSystemColorMode }) => (
					<ChakraProvider
						key={useSystemColorMode.toString()}
						theme={extendTheme(theme, {
							config: { useSystemColorMode },
						})}
						{...props}
					/>
				)}
			</SystemColorModeContext.Consumer>
		</SystemColorModeContext.Provider>
	)
}
