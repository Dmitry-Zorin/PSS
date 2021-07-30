import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import CodeIcon from '@material-ui/icons/Code'
import DescriptionIcon from '@material-ui/icons/Description'
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList'
import GroupIcon from '@material-ui/icons/Group'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import PieChartIcon from '@material-ui/icons/PieChart'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'
import SchoolIcon from '@material-ui/icons/School'
import ShortTextIcon from '@material-ui/icons/ShortText'
import SubjectIcon from '@material-ui/icons/Subject'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import TimelineIcon from '@material-ui/icons/Timeline'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import React from 'react'
import { Admin, Resource } from 'react-admin'
import Dashboard from './DashBoard.js'
import MyLayout from './layout/MyLayout.js'
import authProvider, { user } from './providers/authProvider.js'
import dataProvider from './providers/dataProvider.js'
import i18nProvider from './providers/i18nProvider.js'
import Abstract from './resources/abstracts'
import {
	CreateForm as ApprobationCreate,
	EditForm as ApprobationEdit,
	ListForm as ApprobationList,
	ShowForm as ApprobationShow,
} from './resources/approbations.js'
import Article from './resources/articles'
import { CreateForm as CharacterCreate, ListForm as CharacterList } from './resources/characters.js'
import {
	CreateForm as DevelopmentCreate,
	EditForm as DevelopmentEdit,
	ListForm as DevelopmentList,
	ShowForm as DevelopmentShow,
} from './resources/developments.js'
import Dissertation from './resources/dissertations'
import Employees from './resources/employees'
import { Form16 } from './resources/Form16.js'
import Library from './resources/library'
import Monograph from './resources/monographs'
import Patents from './resources/patents'
import Platoons from './resources/platoons'
import Programs from './resources/programs'
import {
	CreateForm as ProjectCreate,
	EditForm as ProjectEdit,
	ListForm as ProjectList,
	ShowForm as ProjectShow,
} from './resources/projects.js'
import {
	CreateForm as PublicationCreate,
	EditForm as PublicationEdit,
	ListForm as PublicationList,
	ShowForm as PublicationShow,
} from './resources/publications.js'
import {
	CreateForm as RationalizationCreate,
	EditForm as RationalizationEdit,
	ListForm as RationalizationList,
	ShowForm as RationalizationShow,
} from './resources/rationalizations.js'
import Report from './resources/reports'
import {
	CreateForm as ResearchCreate,
	EditForm as ResearchEdit,
	ListForm as ResearchList,
	ShowForm as ResearchShow,
} from './resources/researches.js'
import {
	CreateForm as SubdivisionCreate,
	EditForm as SubdivisionEdit,
	ListForm as SubdivisionList,
	ShowForm as SubdivisionShow,
} from './resources/subdivisions.js'
import Textbook from './resources/textbooks'
import {
	CreateForm as ThesisCreate,
	EditForm as ThesisEdit,
	ListForm as ThesisList,
	ShowForm as ThesisShow,
} from './resources/theses.js'
import { Timeline } from './resources/timeline.js'
import {
	CreateForm as UserCreate,
	ListForm as UserList,
	ShowForm as UserShow,
} from './resources/users.js'
import {
	CreateForm as VerificationCreate,
	EditForm as VerificationEdit,
	ListForm as VerificationList,
	ShowForm as VerificationShow,
} from './resources/verifications.js'

const permissions = true

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
			title='Система храниния научных трудов'
			dashboard={Dashboard}
			i18nProvider={i18nProvider}
			dataProvider={dataProvider}
			authProvider={authProvider}
			customReducers={{ theme: themeReducer }}
		>
			<Resource
				name='timeline'
				icon={TimelineIcon}
				options={{ label: 'События' }}
				list={Timeline}
			/>
			<Resource
				name='library'
				icon={LocalLibraryIcon}
				options={{ label: 'Библиотека' }}
				list={Library.list}
				edit={permissions ? Library.edit : undefined}
				create={permissions ? Library.create : undefined}
				show={Library.show}
			/>
			<Resource
				name='articles'
				icon={VerticalSplitIcon}
				options={{ label: 'Статьи' }}
				list={Article.list}
				edit={permissions ? Article.edit : undefined}
				create={permissions ? Article.create : undefined}
				show={Article.show}
			/>
			<Resource
				name='programs'
				icon={CodeIcon}
				options={{ label: 'Программы' }}
				list={Programs.list}
				edit={permissions ? Programs.edit : undefined}
				create={permissions ? Programs.create : undefined}
				show={Programs.show}
			/>
			<Resource
				name='researches'
				icon={SchoolIcon}
				options={{ label: 'НИР' }}
				list={ResearchList}
				edit={permissions ? ResearchEdit : undefined}
				create={permissions ? ResearchCreate : undefined}
				show={ResearchShow}
			/>
			<Resource
				name='developments'
				icon={DeveloperBoardIcon}
				options={{ label: 'ОКР' }}
				list={DevelopmentList}
				edit={permissions ? DevelopmentEdit : undefined}
				create={permissions ? DevelopmentCreate : undefined}
				show={DevelopmentShow}
			/>
			<Resource
				name='rationalizations'
				icon={EmojiObjectsIcon}
				options={{ label: 'Рацпредложения' }}
				list={RationalizationList}
				edit={permissions ? RationalizationEdit : undefined}
				create={permissions ? RationalizationCreate : undefined}
				show={RationalizationShow}
			/>
			<Resource
				name='projects'
				icon={TrendingUpIcon}
				options={{ label: 'Проекты' }}
				list={ProjectList}
				edit={permissions ? ProjectEdit : undefined}
				create={permissions ? ProjectCreate : undefined}
				show={ProjectShow}
			/>
			<Resource
				name='theses'
				icon={ShortTextIcon}
				options={{ label: 'Тезисы докладов' }}
				list={ThesisList}
				edit={permissions ? ThesisEdit : undefined}
				create={permissions ? ThesisCreate : undefined}
				show={ThesisShow}
			/>
			<Resource
				name='approbations'
				icon={ThumbUpAltIcon}
				options={{ label: 'Апробации' }}
				list={ApprobationList}
				edit={permissions ? ApprobationEdit : undefined}
				create={permissions ? ApprobationCreate : undefined}
				show={ApprobationShow}
			/>
			<Resource
				name='patents'
				icon={PlaylistAddCheckIcon}
				options={{ label: 'Патенты' }}
				list={Patents.list}
				edit={permissions ? Patents.edit : undefined}
				create={permissions ? Patents.create : undefined}
				show={Patents.show}
			/>
			<Resource
				name='verifications'
				icon={VerifiedUserIcon}
				options={{ label: 'Испытания' }}
				list={VerificationList}
				edit={permissions ? VerificationEdit : undefined}
				create={permissions ? VerificationCreate : undefined}
				show={VerificationShow}
			/>
			<Resource
				name='publications'
				icon={VisibilityIcon}
				options={{ label: 'Места публикации' }}
				list={PublicationList}
				edit={PublicationEdit}
				create={PublicationCreate}
				show={PublicationShow}
			/>
			<Resource
				name='monographs'
				icon={DescriptionIcon}
				options={{ label: 'Монографии' }}
				list={Monograph.list}
				edit={permissions ? Monograph.edit : undefined}
				create={permissions ? Monograph.create : undefined}
				show={Monograph.show}
			/>
			<Resource
				name='textbooks'
				icon={MenuBookIcon}
				options={{ label: 'Учебники' }}
				list={Textbook.list}
				edit={permissions ? Textbook.edit : undefined}
				create={permissions ? Textbook.create : undefined}
				show={Textbook.show}
			/>
			<Resource
				name='reports'
				icon={SubjectIcon}
				options={{ label: 'Отчеты' }}
				list={Report.list}
				edit={permissions ? Report.edit : undefined}
				create={permissions ? Report.create : undefined}
				show={Report.show}
			/>
			<Resource
				name='abstracts'
				icon={InsertDriveFileIcon}
				options={{ label: 'Авторефераты' }}
				list={Abstract.list}
				edit={permissions ? Abstract.edit : undefined}
				create={permissions ? Abstract.create : undefined}
				show={Abstract.show}
			/>
			<Resource
				name='dissertations'
				icon={LibraryBooksIcon}
				options={{ label: 'Диссертации' }}
				list={Dissertation.list}
				edit={permissions ? Dissertation.edit : undefined}
				create={permissions ? Dissertation.create : undefined}
				show={Dissertation.show}
			/>
			<Resource
				name='subdivisions'
				icon={PieChartIcon}
				options={{ label: 'Подразделения' }}
				list={SubdivisionList}
				edit={SubdivisionEdit}
				create={SubdivisionCreate}
				show={SubdivisionShow}
			/>
			<Resource
				name='users'
				icon={GroupIcon}
				options={{ label: 'Пользователи' }}
				list={UserList}
				create={UserCreate}
				show={UserShow}
			/>
			<Resource
				name='form16'
				icon={FeaturedPlayListIcon}
				options={{ label: 'Форма №16' }}
				list={Form16}
			/>
			<Resource
				name='employees'
				icon={AccountCircleIcon}
				options={{ label: 'Операторы' }}
				list={Employees.list}
				edit={permissions ? Employees.edit : undefined}
				create={permissions ? Employees.create : undefined}
				show={Employees.show}
			/>
			<Resource
				name='platoons'
				icon={SupervisedUserCircleIcon}
				options={{ label: 'Взвода' }}
				list={Platoons.list}
				edit={permissions ? Platoons.edit : undefined}
				create={permissions ? Platoons.create : undefined}
				show={Platoons.show}
			/>
			<Resource
				name='characters'
				options={{ label: 'Характеры работы' }}
				list={CharacterList}
				create={CharacterCreate}
			/>
		</Admin>
	)
}

export default App
