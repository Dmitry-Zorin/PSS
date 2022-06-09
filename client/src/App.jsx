import { entries } from 'lodash'
import resources from 'pages/resources'
import { Admin, Resource } from 'react-admin'
import { QueryClient } from 'react-query'
import authProvider from './auth.provider'
import { Layout } from './components'
import dataProvider from './data.provider'
import i18nProvider from './i18n/i18n.provider'
import { Dashboard } from './pages/Dashboard'
import themes from './themes'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
		},
	},
})

function getResources(resources, permissions = false) {
	return entries(resources).map(([name, props]) => {
		const { list, show, create, edit, ...otherProps } = props
		return (
			<Resource
				name={name}
				list={list}
				show={show}
				{...(permissions && {
					create: create,
					edit: edit,
				})}
				{...otherProps}
			/>
		)
	})
}

const getResourcesList = (permissions) => [
	...getResources(resources.main),
	...getResources(resources.publications, permissions),
	...(permissions ? getResources(resources.admin, true) : []),
]

const App = () => (
	<Admin
		title="metadata.title"
		theme={themes.base}
		layout={Layout}
		loginPage={false}
		dashboard={Dashboard}
		queryClient={queryClient}
		authProvider={authProvider}
		dataProvider={dataProvider}
		i18nProvider={i18nProvider}
	>
		{getResourcesList}
	</Admin>
)

export default App
