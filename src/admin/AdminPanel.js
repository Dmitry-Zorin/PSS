import DateFnsUtils from '@date-io/date-fns'
import CodeIcon from '@material-ui/icons/Code'
import DescriptionIcon from '@material-ui/icons/Description'
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList'
import GroupIcon from '@material-ui/icons/Group'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import PieChartIcon from '@material-ui/icons/PieChart'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'
import SchoolIcon from '@material-ui/icons/School'
import SubjectIcon from '@material-ui/icons/Subject'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import TimelineIcon from '@material-ui/icons/Timeline'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import React from 'react'
import { Admin, Resource } from 'react-admin'
import theme from '../utils/theme'
import authProvider from './AuthProvider'
import DashBoard from './DashBoard'
import dataProvider from './DataProvider'
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
import { Form16 } from './resources/Form16'
import Library from './resources/library/index'
import Patents from './resources/patents/index'
import Programs from './resources/programs/index'
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

const AdminPanel = () => (
	<MuiPickersUtilsProvider utils={RuLocalizedUtils} locale={ru}>
		<Admin
			theme={theme}
			layout={MyLayout}
			customRoutes={Routes}
			title='Технополис «ЭРА»'
			dashboard={DashBoard}
			i18nProvider={i18nProvider}
			dataProvider={dataProvider}
			authProvider={authProvider}
		>
			{(permissions) => [
				<Resource
					name='timeline'
					icon={TimelineIcon}
					options={{ label: 'События' }}
					list={Timeline}
				/>,
				<Resource
					name="articles"
					icon={DescriptionIcon}
					options={{ label: 'Статьи' }}
					list={ArticleList}
					edit={permissions ? ArticleEdit : undefined}
					create={permissions ? ArticleCreate : undefined}
					show={ArticleShow}
				/>,
				<Resource
					name="programs"
					icon={CodeIcon}
					options={{ label: 'Программы' }}
					list={Programs.list}
					edit={permissions ? Programs.edit : undefined}
					create={permissions ? Programs.create : undefined}
					show={Programs.show}
				/>,
				<Resource
					name="researches"
					icon={SchoolIcon}
					options={{ label: 'НИР' }}
					list={ResearchList}
					edit={permissions ? ResearchEdit : undefined}
					create={permissions ? ResearchCreate : undefined}
					show={ResearchShow}
				/>,
				<Resource
					name="developments"
					icon={DeveloperBoardIcon}
					options={{ label: 'ОКР' }}
					list={DevelopmentList}
					edit={permissions ? DevelopmentEdit : undefined}
					create={permissions ? DevelopmentCreate : undefined}
					show={DevelopmentShow}
				/>,
				<Resource
					name="rationalizations"
					icon={EmojiObjectsIcon}
					options={{ label: 'Предложения' }}
					list={RationalizationList}
					edit={permissions ? RationalizationEdit : undefined}
					create={permissions ? RationalizationCreate : undefined}
					show={RationalizationShow}
				/>,
				<Resource
					name="projects"
					icon={TrendingUpIcon}
					options={{ label: 'Проекты' }}
					list={ProjectList}
					edit={permissions ? ProjectEdit : undefined}
					create={permissions ? ProjectCreate : undefined}
					show={ProjectShow}
				/>,
				<Resource
					name="abstracts"
					icon={SubjectIcon}
					options={{ label: 'Тезисы' }}
					list={AbstractList}
					edit={permissions ? AbstractEdit : undefined}
					create={permissions ? AbstractCreate : undefined}
					show={AbstractShow}
				/>,
				<Resource
					name="approbations"
					icon={ThumbUpAltIcon}
					options={{ label: 'Апробации' }}
					list={ApprobationList}
					edit={permissions ? ApprobationEdit : undefined}
					create={permissions ? ApprobationCreate : undefined}
					show={ApprobationShow}
				/>,
				<Resource
					name="patents"
					icon={PlaylistAddCheckIcon}
					options={{ label: 'Патенты' }}
					list={Patents.list}
					edit={permissions ? Patents.edit : undefined}
					create={permissions ? Patents.create : undefined}
					show={Patents.show}
				/>,
				<Resource
					name="verifications"
					icon={VerifiedUserIcon}
					options={{ label: 'Испытания' }}
					list={VerificationList}
					edit={permissions ? VerificationEdit : undefined}
					create={permissions ? VerificationCreate : undefined}
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
					name='form16'
					icon={FeaturedPlayListIcon}
					options={{ label: 'Справка' }}
					list={Form16}
				/>,
				<Resource
					name='library'
					icon={MenuBookIcon}
					options={{ label: 'Библиотека' }}
					list={Library.list}
					edit={permissions ? Library.edit : undefined}
					create={permissions ? Library.create : undefined}
					show={Library.show}
				/>
			]}
		</Admin>
	</MuiPickersUtilsProvider>
)

export default AdminPanel