import { SidebarContext } from 'contexts/SidebarContext'
import { useContext } from 'react'

export default function useSidebarState() {
	return useContext(SidebarContext)
}
