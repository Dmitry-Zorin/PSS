import { Datagrid, DatagridProps } from 'react-admin'

const ListUI = (props: DatagridProps) => (
	<Datagrid rowClick="edit" optimized {...props} />
)

export default ListUI
