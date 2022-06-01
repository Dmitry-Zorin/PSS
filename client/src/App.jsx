import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList'
import TimelineIcon from '@mui/icons-material/Timeline'
import entries from 'just-entries'
import { Admin, Resource } from 'react-admin'
import DashBoard from './DashBoard'
import MyLayout from './layout/MyLayout'
import authProvider from './providers/authProvider'
import dataProvider from './providers/dataProvider'
import i18nProvider from './providers/i18nProvider'
import * as adminResources from './resources/admin'
import publications from './resources/publications'
import PublicationCreate from './resources/publications/PublicationCreate'
import PublicationEdit from './resources/publications/PublicationEdit'
import PublicationList from './resources/publications/PublicationList'
import PublicationShow from './resources/publications/PublicationShow'
import PublicationsList from './resources/PublicationsList'
import Timeline from './resources/Timeline'
import { themes } from './theme/theme'

const App = () => (
	<Admin
		title="metadata.title"
		theme={themes.common}
		layout={MyLayout}
		dashboard={DashBoard}
		authProvider={authProvider}
		dataProvider={dataProvider}
		i18nProvider={i18nProvider}
	>
		<Resource name="timeline" icon={TimelineIcon} list={Timeline} />
		<Resource
			name="publicationsList"
			icon={FeaturedPlayListIcon}
			list={PublicationsList}
		/>
		{(permissions) => {
			return entries({ ...publications, ...adminResources }).map(
				([name, props]) => {
					const { list, show, create, edit, ...otherProps } = props
					return (
						<Resource
							key={name}
							name={name}
							list={list || PublicationList}
							show={show || PublicationShow}
							{...(permissions && {
								create: create || PublicationCreate,
								edit: edit || PublicationEdit,
							})}
							{...otherProps}
						/>
					)
				},
			)
		}}
	</Admin>
)

export default App
