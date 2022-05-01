import entries from 'just-entries'
import React from 'react'
import { Admin, Resource } from 'react-admin'
import MyLayout from './layout/MyLayout'
import Lazy from './Lazy'
import authProvider from './providers/authProvider'
import dataProvider from './providers/dataProvider'
import i18nProvider from './providers/i18nProvider'
import publications from './resources/publications'
import PublicationsList from './resources/PublicationsList'
import Timeline from './resources/Timeline'
import TimelineIcon from '@mui/icons-material/Timeline'
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList'
import * as adminResources from './resources/admin'

const getLazyComponent = (component) => (
	(props) => <Lazy component={component} {...props}/>
)

const App = () => (
	<Admin
		title='metadata.title'
		layout={MyLayout}
		i18nProvider={i18nProvider}
		dataProvider={dataProvider}
		authProvider={authProvider}
		dashboard={getLazyComponent(() => import('./DashBoard'))}
	>
		<Resource
			name='timeline'
			icon={TimelineIcon}
			list={Timeline}
		/>
		<Resource
			name='publicationsList'
			icon={FeaturedPlayListIcon}
			list={PublicationsList}
		/>
		{permissions => (
			entries({ ...publications, ...adminResources }).map(([name, props]) => {
				const { list, show, create, edit, ...otherProps } = props
				return (
					<Resource
						key={name}
						name={name}
						list={getLazyComponent(list || (() => import('./resources/publications/PublicationList')))}
						show={getLazyComponent(show || (() => import('./resources/publications/PublicationShow')))}
						{...permissions && {
							create: getLazyComponent(create || (() => import('./resources/publications/PublicationCreate'))),
							edit: getLazyComponent(edit || (() => import('./resources/publications/PublicationEdit'))),
						}}
						{...otherProps}
					/>
				)
			})
		)}
	</Admin>
)

export default App
