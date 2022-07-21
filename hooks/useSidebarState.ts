import { useContext } from 'react'
import { SidebarContext } from 'components'

export default function useSidebarState() {
	return useContext(SidebarContext)
}
