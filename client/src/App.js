import entries from 'just-entries'
import React from 'react'
import { Admin, Resource } from 'react-admin'
import Dashboard from './DashBoard'
import './index.css'
import MyLayout from './layout/MyLayout'
import authProvider, { user } from './providers/authProvider'
import dataProvider from './providers/dataProvider'
import i18nProvider from './providers/i18nProvider'
import * as resources from './resources/index'

const App = () => {
	const { theme } = user || {}
	
	const themeReducer = (state = theme || 'light', action) => {
		if (action.type === 'CHANGE_THEME') {
			return action.payload
		}
		return state
	}
	
	return (
		<Admin
			layout={MyLayout}
			title='metadata.title'
			dashboard={Dashboard}
			i18nProvider={i18nProvider}
			dataProvider={dataProvider}
			authProvider={authProvider}
			customReducers={{ theme: themeReducer }}
		>
			{(permissions) => (
				entries(resources).map(([name, props]) => (
					<Resource
						{...props}
						key={name}
						name={name}
						create={permissions ? props.create : undefined}
						edit={permissions ? props.edit : undefined}
					/>
				))
			)}
		</Admin>
	)
}

export default App
