import { LargeTextInput } from '../../components/inputs'
import MyEdit from '../../MyEdit'

const CharacterEdit = () => (
	<MyEdit actions={false}>
		<LargeTextInput source="name" required />
	</MyEdit>
)

export default CharacterEdit
