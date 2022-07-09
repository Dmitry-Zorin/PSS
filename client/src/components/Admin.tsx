import { Permissions } from 'auth.provider'
import { ReactNode } from 'react'
import { usePermissions } from 'react-admin'

const Admin = ({ children }: { children: ReactNode }) => {
	const { permissions } = usePermissions<Permissions>()
	return permissions?.isAdmin ? <>{children}</> : null
}

export default Admin