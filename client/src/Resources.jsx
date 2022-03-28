// import AccountCircleIcon from '@mui/icons-material/AccountCircle'
// import CodeIcon from '@mui/icons-material/Code'
// import DescriptionIcon from '@mui/icons-material/Description'
// import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard'
// import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects'
// import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList'
// import GroupIcon from '@mui/icons-material/Group'
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
// import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
// import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
// import MenuBookIcon from '@mui/icons-material/MenuBook'
// import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
// import SchoolIcon from '@mui/icons-material/School'
// import ShortTextIcon from '@mui/icons-material/ShortText'
// import SubjectIcon from '@mui/icons-material/Subject'
// import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
// import TimelineIcon from '@mui/icons-material/Timeline'
// import TrendingUpIcon from '@mui/icons-material/TrendingUp'
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
// import React from 'react'
// import { Resource, usePermissions } from 'react-admin'
// import Abstract from './resources/abstracts'
// import {
// 	CreateForm as CharacterCreate,
// 	ListForm as CharacterList,
// } from './resources/characters/characters'
// import Dissertation from './resources/dissertations'
// import Employees from './resources/employees'
// import { Form16 } from './resources/Form16'
// import Library from './resources/library'
// import Monograph from './resources/monographs'
// import {
// 	CreateForm as ApprobationCreate,
// 	EditForm as ApprobationEdit,
// 	ListForm as ApprobationList,
// 	ShowForm as ApprobationShow,
// } from './resources/old/approbations'
// import {
// 	CreateForm as DevelopmentCreate,
// 	EditForm as DevelopmentEdit,
// 	ListForm as DevelopmentList,
// 	ShowForm as DevelopmentShow,
// } from './resources/old/developments'
// import {
// 	CreateForm as ProjectCreate,
// 	EditForm as ProjectEdit,
// 	ListForm as ProjectList,
// 	ShowForm as ProjectShow,
// } from './resources/old/projects'
// import {
// 	CreateForm as RationalizationCreate,
// 	EditForm as RationalizationEdit,
// 	ListForm as RationalizationList,
// 	ShowForm as RationalizationShow,
// } from './resources/old/rationalizations'
// import {
// 	CreateForm as ResearchCreate,
// 	EditForm as ResearchEdit,
// 	ListForm as ResearchList,
// 	ShowForm as ResearchShow,
// } from './resources/old/researches'
// import {
// 	CreateForm as ThesisCreate,
// 	EditForm as ThesisEdit,
// 	ListForm as ThesisList,
// 	ShowForm as ThesisShow,
// } from './resources/old/theses'
// import {
// 	CreateForm as VerificationCreate,
// 	EditForm as VerificationEdit,
// 	ListForm as VerificationList,
// 	ShowForm as VerificationShow,
// } from './resources/old/verifications'
// import Patents from './resources/patents'
// import Platoons from './resources/platoons'
// import Programs from './resources/programs'
// import Report from './resources/reports'
// import Textbook from './resources/textbooks'
// import { Timeline } from './resources/timeline'
// import {
// 	CreateForm as UserCreate,
// 	ListForm as UserList,
// 	ShowForm as UserShow,
// } from './resources/users'
//
// const Resources = () => {
// 	const permissions = usePermissions()
//
// 	return (
// 		<>
// 			<Resource
// 				name='timeline'
// 				icon={TimelineIcon}
// 				options={{ label: 'События' }}
// 				list={Timeline}
// 			/>
// 			<Resource
// 				name='library'
// 				icon={LocalLibraryIcon}
// 				options={{ label: 'Библиотека' }}
// 				list={Library.list}
// 				edit={permissions ? Library.edit : undefined}
// 				create={permissions ? Library.create : undefined}
// 				show={Library.show}
// 			/>
// 			<Resource
// 				name='programs'
// 				icon={CodeIcon}
// 				options={{ label: 'Программы' }}
// 				list={Programs.list}
// 				edit={permissions ? Programs.edit : undefined}
// 				create={permissions ? Programs.create : undefined}
// 				show={Programs.show}
// 			/>
// 			<Resource
// 				name='researches'
// 				icon={SchoolIcon}
// 				options={{ label: 'НИР' }}
// 				list={ResearchList}
// 				edit={permissions ? ResearchEdit : undefined}
// 				create={permissions ? ResearchCreate : undefined}
// 				show={ResearchShow}
// 			/>
// 			<Resource
// 				name='developments'
// 				icon={DeveloperBoardIcon}
// 				options={{ label: 'ОКР' }}
// 				list={DevelopmentList}
// 				edit={permissions ? DevelopmentEdit : undefined}
// 				create={permissions ? DevelopmentCreate : undefined}
// 				show={DevelopmentShow}
// 			/>
// 			<Resource
// 				name='rationalizations'
// 				icon={EmojiObjectsIcon}
// 				options={{ label: 'Рацпредложения' }}
// 				list={RationalizationList}
// 				edit={permissions ? RationalizationEdit : undefined}
// 				create={permissions ? RationalizationCreate : undefined}
// 				show={RationalizationShow}
// 			/>
// 			<Resource
// 				name='projects'
// 				icon={TrendingUpIcon}
// 				options={{ label: 'Проекты' }}
// 				list={ProjectList}
// 				edit={permissions ? ProjectEdit : undefined}
// 				create={permissions ? ProjectCreate : undefined}
// 				show={ProjectShow}
// 			/>
// 			<Resource
// 				name='theses'
// 				icon={ShortTextIcon}
// 				options={{ label: 'Тезисы докладов' }}
// 				list={ThesisList}
// 				edit={permissions ? ThesisEdit : undefined}
// 				create={permissions ? ThesisCreate : undefined}
// 				show={ThesisShow}
// 			/>
// 			<Resource
// 				name='approbations'
// 				icon={ThumbUpAltIcon}
// 				options={{ label: 'Апробации' }}
// 				list={ApprobationList}
// 				edit={permissions ? ApprobationEdit : undefined}
// 				create={permissions ? ApprobationCreate : undefined}
// 				show={ApprobationShow}
// 			/>
// 			<Resource
// 				name='patents'
// 				icon={PlaylistAddCheckIcon}
// 				options={{ label: 'Патенты' }}
// 				list={Patents.list}
// 				edit={permissions ? Patents.edit : undefined}
// 				create={permissions ? Patents.create : undefined}
// 				show={Patents.show}
// 			/>
// 			<Resource
// 				name='verifications'
// 				icon={VerifiedUserIcon}
// 				options={{ label: 'Испытания' }}
// 				list={VerificationList}
// 				edit={permissions ? VerificationEdit : undefined}
// 				create={permissions ? VerificationCreate : undefined}
// 				show={VerificationShow}
// 			/>
// 			<Resource
// 				name='monographs'
// 				icon={DescriptionIcon}
// 				options={{ label: 'Монографии' }}
// 				list={Monograph.list}
// 				edit={permissions ? Monograph.edit : undefined}
// 				create={permissions ? Monograph.create : undefined}
// 				show={Monograph.show}
// 			/>
// 			<Resource
// 				name='textbooks'
// 				icon={MenuBookIcon}
// 				options={{ label: 'Учебники' }}
// 				list={Textbook.list}
// 				edit={permissions ? Textbook.edit : undefined}
// 				create={permissions ? Textbook.create : undefined}
// 				show={Textbook.show}
// 			/>
// 			<Resource
// 				name='reports'
// 				icon={SubjectIcon}
// 				options={{ label: 'Отчеты' }}
// 				list={Report.list}
// 				edit={permissions ? Report.edit : undefined}
// 				create={permissions ? Report.create : undefined}
// 				show={Report.show}
// 			/>
// 			<Resource
// 				name='abstracts'
// 				icon={InsertDriveFileIcon}
// 				options={{ label: 'Авторефераты' }}
// 				list={Abstract.list}
// 				edit={permissions ? Abstract.edit : undefined}
// 				create={permissions ? Abstract.create : undefined}
// 				show={Abstract.show}
// 			/>
// 			<Resource
// 				name='dissertations'
// 				icon={LibraryBooksIcon}
// 				options={{ label: 'Диссертации' }}
// 				list={Dissertation.list}
// 				edit={permissions ? Dissertation.edit : undefined}
// 				create={permissions ? Dissertation.create : undefined}
// 				show={Dissertation.show}
// 			/>
// 			<Resource
// 				name='users'
// 				icon={GroupIcon}
// 				options={{ label: 'Пользователи' }}
// 				list={UserList}
// 				create={UserCreate}
// 				show={UserShow}
// 			/>
// 			<Resource
// 				name='form16'
// 				icon={FeaturedPlayListIcon}
// 				options={{ label: 'Форма №16' }}
// 				list={Form16}
// 			/>
// 			<Resource
// 				name='employees'
// 				icon={AccountCircleIcon}
// 				options={{ label: 'Операторы' }}
// 				list={Employees.list}
// 				edit={permissions ? Employees.edit : undefined}
// 				create={permissions ? Employees.create : undefined}
// 				show={Employees.show}
// 			/>
// 			<Resource
// 				name='platoons'
// 				icon={SupervisedUserCircleIcon}
// 				options={{ label: 'Взвода' }}
// 				list={Platoons.list}
// 				edit={permissions ? Platoons.edit : undefined}
// 				create={permissions ? Platoons.create : undefined}
// 				show={Platoons.show}
// 			/>
// 			<Resource
// 				name='characters'
// 				options={{ label: 'Характеры работы' }}
// 				list={CharacterList}
// 				create={CharacterCreate}
// 			/>
// 		</>
// 	)
// }
//
// export default Resources
