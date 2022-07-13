import type { DatagridProps } from 'react-admin'
import { Datagrid } from 'react-admin'

const ListUI = (props: DatagridProps) => (
	<Datagrid rowClick="edit" optimized {...props} />
)

export default ListUI
