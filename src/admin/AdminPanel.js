import DateFnsUtils from '@date-io/date-fns'

import { createMuiTheme } from '@material-ui/core/styles'
import BallotIcon from '@material-ui/icons/Ballot'
import CardMembershipIcon from '@material-ui/icons/CardMembership'
import CardTravelIcon from '@material-ui/icons/CardTravel'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

import CodeIcon from '@material-ui/icons/Code'
import DashboardIcon from '@material-ui/icons/Dashboard'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList'
import GroupIcon from '@material-ui/icons/Group'
import ListIcon from '@material-ui/icons/List'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import PieChartIcon from '@material-ui/icons/PieChart'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import TimelineIcon from '@material-ui/icons/Timeline'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'

import polyglotI18nProvider from 'ra-i18n-polyglot'
import React from 'react'

import { Admin, Resource } from 'react-admin'
import authProvider from './AuthProvider'

import DashBoard from './DashBoard'

import dataProvider from './DataProvider'
import { Form16 } from './Form16'
import russianMessages from './locale'
import MyLayout from './MyLayout'

import {
	CreateForm as AbstractCreate,
	EditForm as AbstractEdit,
	ListForm as AbstractList,
	ShowForm as AbstractShow,
} from './resources/abstracts'

import {
	CreateForm as ApprobationCreate,
	EditForm as ApprobationEdit,
	ListForm as ApprobationList,
	ShowForm as ApprobationShow,
} from './resources/approbations'

import {
	CreateForm as ArticleCreate,
	EditForm as ArticleEdit,
	ListForm as ArticleList,
	ShowForm as ArticleShow,
} from './resources/articles'

import {
	CreateForm as DevelopmentCreate,
	EditForm as DevelopmentEdit,
	ListForm as DevelopmentList,
	ShowForm as DevelopmentShow,
} from './resources/developments'

import {
	CreateForm as PatentCreate,
	EditForm as PatentEdit,
	ListForm as PatentList,
	ShowForm as PatentShow,
} from './resources/patents'

import {
	CreateForm as ProgramCreate,
	EditForm as ProgramEdit,
	ListForm as ProgramList,
	ShowForm as ProgramShow,
} from './resources/programs'

import {
	CreateForm as ProjectCreate,
	EditForm as ProjectEdit,
	ListForm as ProjectList,
	ShowForm as ProjectShow,
} from './resources/projects'

import {
	CreateForm as PublicationCreate,
	EditForm as PublicationEdit,
	ListForm as PublicationList,
	ShowForm as PublicationShow,
} from './resources/publications'

import {
	CreateForm as RationalizationCreate,
	EditForm as RationalizationEdit,
	ListForm as RationalizationList,
	ShowForm as RationalizationShow,
} from './resources/rationalizations'

import {
	CreateForm as ResearchCreate,
	EditForm as ResearchEdit,
	ListForm as ResearchList,
	ShowForm as ResearchShow,
} from './resources/researches'

import {
	CreateForm as SubdivisionCreate,
	EditForm as SubdivisionEdit,
	ListForm as SubdivisionList,
	ShowForm as SubdivisionShow,
} from './resources/subdivisions'

import { Timeline } from './resources/timeline'

import { CreateForm as UserCreate, ListForm as UserList, ShowForm as UserShow, } from './resources/users'

import {
	CreateForm as VerificationCreate,
	EditForm as VerificationEdit,
	ListForm as VerificationList,
	ShowForm as VerificationShow,
} from './resources/verifications'

import Routes from './routes'

class RuLocalizedUtils extends DateFnsUtils {
	getCalendarHeaderText(date) {
		return format(date, 'LLLL', { locale: this.locale })
	}

	getDatePickerHeaderText(date) {
		return format(date, 'EEEE, d MMMM', { locale: this.locale })
	}
}

const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru')

const theme = createMuiTheme({
	typography: {
		fontFamily: 'Nunito',
	}
})

const AdminPanel = () => (
	<MuiPickersUtilsProvider utils={RuLocalizedUtils} locale={ru}>
		<Admin
			theme={theme}
			layout={MyLayout}
			customRoutes={Routes}
			title='Технополис "ЭРА"'
			dashboard={DashBoard}
			i18nProvider={i18nProvider}
			dataProvider={dataProvider}
			authProvider={authProvider}
		>
			{(permissions) => [
				<Resource
					name="articles"
					icon={TextFieldsIcon}
					options={{ label: 'Статьи' }}
					list={ArticleList}
					edit={permissions ? ArticleEdit : null}
					create={permissions ? ArticleCreate : null}
					show={ArticleShow}
				/>,
				<Resource
					name="programs"
					icon={CodeIcon}
					options={{ label: 'Программы' }}
					list={ProgramList}
					edit={permissions ? ProgramEdit : null}
					create={permissions ? ProgramCreate : null}
					show={ProgramShow}
				/>,
				<Resource
					name="researches"
					icon={MenuBookIcon}
					options={{ label: 'НИР' }}
					list={ResearchList}
					edit={permissions ? ResearchEdit : null}
					create={permissions ? ResearchCreate : null}
					show={ResearchShow}
				/>,
				<Resource
					name="developments"
					icon={DashboardIcon}
					options={{ label: 'ОКР' }}
					list={DevelopmentList}
					edit={permissions ? DevelopmentEdit : null}
					create={permissions ? DevelopmentCreate : null}
					show={DevelopmentShow}
				/>,
				<Resource
					name="rationalizations"
					icon={EmojiObjectsIcon}
					options={{ label: 'Рационализаторские\nпредложения' }}
					list={RationalizationList}
					edit={permissions ? RationalizationEdit : null}
					create={permissions ? RationalizationCreate : null}
					show={RationalizationShow}
				/>,
				<Resource
					name="projects"
					icon={CardTravelIcon}
					options={{ label: 'Инициативные\nпроекты' }}
					list={ProjectList}
					edit={permissions ? ProjectEdit : null}
					create={permissions ? ProjectCreate : null}
					show={ProjectShow}
				/>,
				<Resource
					name="abstracts"
					icon={ListIcon}
					options={{ label: 'Тезисы докладов' }}
					list={AbstractList}
					edit={permissions ? AbstractEdit : null}
					create={permissions ? AbstractCreate : null}
					show={AbstractShow}
				/>,
				<Resource
					name="approbations"
					icon={CheckCircleOutlineIcon}
					options={{ label: 'Апробации' }}
					list={ApprobationList}
					edit={permissions ? ApprobationEdit : null}
					create={permissions ? ApprobationCreate : null}
					show={ApprobationShow}
				/>,
				<Resource
					name="patents"
					icon={CardMembershipIcon}
					options={{ label: 'Патенты' }}
					list={PatentList}
					edit={permissions ? PatentEdit : null}
					create={permissions ? PatentCreate : null}
					show={PatentShow}
				/>,
				<Resource
					name="verifications"
					icon={BallotIcon}
					options={{ label: 'Испытания' }}
					list={VerificationList}
					edit={permissions ? VerificationEdit : null}
					create={permissions ? VerificationCreate : null}
					show={VerificationShow}
				/>,
				<Resource
					name="publications"
					icon={VisibilityIcon}
					options={{ label: 'Места публикации' }}
					list={PublicationList}
					edit={PublicationEdit}
					create={PublicationCreate}
					show={PublicationShow}
				/>,
				<Resource
					name="subdivisions"
					icon={PieChartIcon}
					options={{ label: 'Подразделения' }}
					list={SubdivisionList}
					edit={SubdivisionEdit}
					create={SubdivisionCreate}
					show={SubdivisionShow}
				/>,
				<Resource
					name="users"
					icon={GroupIcon}
					options={{ label: 'Пользователи' }}
					list={UserList}
					// edit={UserEdit}
					create={UserCreate}
					show={UserShow}
				/>,
				<Resource
					name='timeline'
					icon={TimelineIcon}
					options={{ label: 'События' }}
					list={Timeline}
				/>,
				<Resource
					name='form16'
					icon={FeaturedPlayListIcon}
					options={{ label: 'Справка' }}
					list={Form16}
				/>
			]}
		</Admin>
	</MuiPickersUtilsProvider>
)

export default AdminPanel