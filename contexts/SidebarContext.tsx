import { createContext, Dispatch, ReactNode, useContext, useState } from 'react'
import { getFromStorage, setToStorage } from 'utils'

const SIDEBAR_OPEN_KEY = 'sidebar.open'

type SidebarContextValue = [boolean, Dispatch<boolean>]

export const SidebarContext = createContext([
	true,
	() => {},
] as SidebarContextValue)

export function SidebarContextProvider({ children }: { children: ReactNode }) {
	const [open, setOpen] = useState(
		getFromStorage<boolean>(SIDEBAR_OPEN_KEY) ?? true,
	)
	return (
		<SidebarContext.Provider
			value={[
				open,
				(value: boolean) => {
					setOpen(value)
					setToStorage(SIDEBAR_OPEN_KEY, value)
				},
			]}
		>
			{children}
		</SidebarContext.Provider>
	)
}
