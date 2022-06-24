import authProvider, { Permissions } from 'auth.provider'
import dataProvider from 'data.provider'
import i18nProvider from 'i18n/i18n.provider'
import { Layout } from 'layout'
import { entries } from 'lodash'
import { About, Dashboard } from 'pages'
import {
	Admin,
	CustomRoutes,
	localStorageStore,
	Resource,
	ResourceProps,
} from 'react-admin'
import { QueryClient } from 'react-query'
import { Route } from 'react-router'
import resources from 'resources'
import themes from 'themes'

function getResources(
	resources: Record<string, Omit<ResourceProps, 'name'>>,
	isAdmin = false,
) {
	return entries(resources).map(([name, props]) => {
		const { create, edit, ...otherProps } = props
		return (
			<Resource
				name={name}
				{...(isAdmin && {
					create: create,
					edit: edit,
				})}
				{...otherProps}
			/>
		)
	})
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
		},
	},
})

export const store = localStorageStore()

const App = () => (
	<Admin
		store={store}
		theme={themes.dark}
		layout={Layout}
		queryClient={queryClient}
		authProvider={authProvider}
		dataProvider={dataProvider}
		i18nProvider={i18nProvider}
	>
		{({ isAdmin }: Permissions) => [
			<CustomRoutes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/about" element={<About />} />
			</CustomRoutes>,
			...getResources(resources.main),
			...getResources(resources.publications, isAdmin),
			...(isAdmin ? getResources(resources.admin, true) : []),
		]}
	</Admin>
)

export default App
