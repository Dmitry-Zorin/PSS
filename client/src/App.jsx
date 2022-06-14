import { Layout } from 'layout/Layout'
import { entries } from 'lodash'
import { About } from 'pages'
import { Admin, CustomRoutes, Resource } from 'react-admin'
import { QueryClient } from 'react-query'
import { Route } from 'react-router'
import resources from 'resources'
import authProvider from './auth.provider'
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

function getResources(resources, isAdmin) {
	return entries(resources).map(([name, props]) => {
		const { list, show, create, edit, ...otherProps } = props
		return (
			<Resource
				name={name}
				list={list}
				show={show}
				{...(isAdmin && {
					create: create,
					edit: edit,
				})}
				{...otherProps}
			/>
		)
	})
}

const App = () => (
	<Admin
		theme={themes.base}
		layout={Layout}
		dashboard={Dashboard}
		queryClient={queryClient}
		authProvider={authProvider}
		dataProvider={dataProvider}
		i18nProvider={i18nProvider}
	>
		{({ isAdmin }) => [
			<CustomRoutes>
				<Route path="/about" element={<About />} />
			</CustomRoutes>,
			...getResources(resources.main),
			...getResources(resources.publications, isAdmin),
			...(isAdmin ? getResources(resources.admin, true) : []),
		]}
	</Admin>
)

export default App
