import DateFnsUtils from '@date-io/date-fns'
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
//import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import TimelineIcon from '@material-ui/icons/Timeline'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit'
import VisibilityIcon from '@material-ui/icons/Visibility'
import {MuiPickersUtilsProvider} from '@material-ui/pickers'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import React from 'react'
import {Admin, Resource} from 'react-admin'
import theme from '../utils/theme'
import authProvider from './AuthProvider'
import DashBoard from './DashBoard'
import dataProvider from './DataProvider'
import russianMessages from './locale'
import MyLayout from './MyLayout'
import Abstract from './resources/abstracts/index'
import {
    CreateForm as ApprobationCreate,
    EditForm as ApprobationEdit,
    ListForm as ApprobationList,
    ShowForm as ApprobationShow,
} from './resources/approbations'
import Article from './resources/articles/index'
import {CreateForm as CategoryCreate, ListForm as CategoryList} from './resources/categories'
import {CreateForm as CharacterCreate, ListForm as CharacterList} from './resources/characters'
import {
    CreateForm as DevelopmentCreate,
    EditForm as DevelopmentEdit,
    ListForm as DevelopmentList,
    ShowForm as DevelopmentShow,
} from './resources/developments'
import Dissertation from './resources/dissertations/index'
//import Employees from './resources/employees/index'
import {Form16} from './resources/Form16'
import Library from './resources/library/index'
import Monograph from './resources/monographs/index'
import Patents from './resources/patents/index'
import Programs from './resources/programs/index'
//import Others from './resources/others/index'
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
import Report from './resources/reports/index'
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
import Textbook from './resources/textbooks/index'
import {
    CreateForm as ThesisCreate,
    EditForm as ThesisEdit,
    ListForm as ThesisList,
    ShowForm as ThesisShow,
} from './resources/theses'
import {Timeline} from './resources/timeline'
import {CreateForm as UserCreate, ListForm as UserList, ShowForm as UserShow,} from './resources/users'
import {
    CreateForm as VerificationCreate,
    EditForm as VerificationEdit,
    ListForm as VerificationList,
    ShowForm as VerificationShow,
} from './resources/verifications'
import Routes from './routes'

class RuLocalizedUtils extends DateFnsUtils {
    getCalendarHeaderText(date) {
        return format(date, 'LLLL', {locale: this.locale})
    }

    getDatePickerHeaderText(date) {
        return format(date, 'EEEE, d MMMM', {locale: this.locale})
    }
}

const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru')
let k = 0

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
                    key={k++}
                    name='timeline'
                    icon={TimelineIcon}
                    options={{label: 'События'}}
                    list={Timeline}
                />,
                <Resource
                    key={k++}
                    name='library'
                    icon={LocalLibraryIcon}
                    options={{label: 'Библиотека'}}
                    list={Library.list}
                    edit={permissions ? Library.edit : undefined}
                    create={permissions ? Library.create : undefined}
                    show={Library.show}
                />,
                <Resource
                    key={k++}
                    name="articles"
                    icon={VerticalSplitIcon}
                    options={{label: 'Статьи'}}
                    list={Article.list}
                    edit={permissions ? Article.edit : undefined}
                    create={permissions ? Article.create : undefined}
                    show={Article.show}
                />,
                <Resource
                    key={k++}
                    name="programs"
                    icon={CodeIcon}
                    options={{label: 'Программы'}}
                    list={Programs.list}
                    edit={permissions ? Programs.edit : undefined}
                    create={permissions ? Programs.create : undefined}
                    show={Programs.show}
                />,
                <Resource
                    key={k++}
                    name="researches"
                    icon={SchoolIcon}
                    options={{label: 'НИР'}}
                    list={ResearchList}
                    edit={permissions ? ResearchEdit : undefined}
                    create={permissions ? ResearchCreate : undefined}
                    show={ResearchShow}
                />,
                <Resource
                    key={k++}
                    name="developments"
                    icon={DeveloperBoardIcon}
                    options={{label: 'ОКР'}}
                    list={DevelopmentList}
                    edit={permissions ? DevelopmentEdit : undefined}
                    create={permissions ? DevelopmentCreate : undefined}
                    show={DevelopmentShow}
                />,
                <Resource
                    key={k++}
                    name="rationalizations"
                    icon={EmojiObjectsIcon}
                    options={{label: 'Рацпредложения'}}
                    list={RationalizationList}
                    edit={permissions ? RationalizationEdit : undefined}
                    create={permissions ? RationalizationCreate : undefined}
                    show={RationalizationShow}
                />,
                <Resource
                    key={k++}
                    name="projects"
                    icon={TrendingUpIcon}
                    options={{label: 'Проекты'}}
                    list={ProjectList}
                    edit={permissions ? ProjectEdit : undefined}
                    create={permissions ? ProjectCreate : undefined}
                    show={ProjectShow}
                />,
                <Resource
                    key={k++}
                    name="theses"
                    icon={ShortTextIcon}
                    options={{label: 'Тезисы докладов'}}
                    list={ThesisList}
                    edit={permissions ? ThesisEdit : undefined}
                    create={permissions ? ThesisCreate : undefined}
                    show={ThesisShow}
                />,
                <Resource
                    key={k++}
                    name="approbations"
                    icon={ThumbUpAltIcon}
                    options={{label: 'Апробации'}}
                    list={ApprobationList}
                    edit={permissions ? ApprobationEdit : undefined}
                    create={permissions ? ApprobationCreate : undefined}
                    show={ApprobationShow}
                />,
                <Resource
                    key={k++}
                    name="patents"
                    icon={PlaylistAddCheckIcon}
                    options={{label: 'Патенты'}}
                    list={Patents.list}
                    edit={permissions ? Patents.edit : undefined}
                    create={permissions ? Patents.create : undefined}
                    show={Patents.show}
                />,
                <Resource
                    key={k++}
                    name="verifications"
                    icon={VerifiedUserIcon}
                    options={{label: 'Испытания'}}
                    list={VerificationList}
                    edit={permissions ? VerificationEdit : undefined}
                    create={permissions ? VerificationCreate : undefined}
                    show={VerificationShow}
                />,
                <Resource
                    key={k++}
                    name="publications"
                    icon={VisibilityIcon}
                    options={{label: 'Места публикации'}}
                    list={PublicationList}
                    edit={PublicationEdit}
                    create={PublicationCreate}
                    show={PublicationShow}
                />,
                <Resource
                    key={k++}
                    name="monographs"
                    icon={DescriptionIcon}
                    options={{label: 'Монографии'}}
                    list={Monograph.list}
                    edit={permissions ? Monograph.edit : undefined}
                    create={permissions ? Monograph.create : undefined}
                    show={Monograph.show}
                />,
                <Resource
                    key={k++}
                    name="textbooks"
                    icon={MenuBookIcon}
                    options={{label: 'Учебники'}}
                    list={Textbook.list}
                    edit={permissions ? Textbook.edit : undefined}
                    create={permissions ? Textbook.create : undefined}
                    show={Textbook.show}
                />,
                <Resource
                    key={k++}
                    name="reports"
                    icon={SubjectIcon}
                    options={{label: 'Отчеты'}}
                    list={Report.list}
                    edit={permissions ? Report.edit : undefined}
                    create={permissions ? Report.create : undefined}
                    show={Report.show}
                />,
                <Resource
                    key={k++}
                    name="abstracts"
                    icon={InsertDriveFileIcon}
                    options={{label: 'Авторефераты'}}
                    list={Abstract.list}
                    edit={permissions ? Abstract.edit : undefined}
                    create={permissions ? Abstract.create : undefined}
                    show={Abstract.show}
                />,
                <Resource
                    key={k++}
                    name="dissertations"
                    icon={LibraryBooksIcon}
                    options={{label: 'Диссертации'}}
                    list={Dissertation.list}
                    edit={permissions ? Dissertation.edit : undefined}
                    create={permissions ? Dissertation.create : undefined}
                    show={Dissertation.show}
                />,
                <Resource
                    key={k++}
                    name="subdivisions"
                    icon={PieChartIcon}
                    options={{label: 'Подразделения'}}
                    list={SubdivisionList}
                    edit={SubdivisionEdit}
                    create={SubdivisionCreate}
                    show={SubdivisionShow}
                />,
                <Resource
                    key={k++}
                    name="users"
                    icon={GroupIcon}
                    options={{label: 'Пользователи'}}
                    list={UserList}
                    // edit={UserEdit}
                    create={UserCreate}
                    show={UserShow}
                />,
                /*<Resource
                    key={k++}
                    name='others'
                    icon={MenuBookIcon}
                    options={{label: 'Научные труды'}}
                    list={Others.list}
                    edit={permissions ? Others.edit : undefined}
                    create={permissions ? Others.create : undefined}
                    show={Others.show}
                />,*/
                <Resource
                    key={k++}
                    name='form16'
                    icon={FeaturedPlayListIcon}
                    options={{label: 'Справка'}}
                    list={Form16}
                />,
                /*<Resource
                    key={k++}
                    name='employees'
                    icon={SupervisedUserCircleIcon}
                    options={{label: 'Сотрудники'}}
                    list={Employees.list}
                    edit={permissions ? Employees.edit : undefined}
                    create={permissions ? Employees.create : undefined}
                    show={Employees.show}
                />,*/
                <Resource
                    key={k++}
                    name="characters"
                    options={{label: 'Характеры работы'}}
                    list={CharacterList}
                    create={CharacterCreate}
                />,
                <Resource
                    key={k++}
                    name="categories"
                    options={{label: 'Категории'}}
                    list={CategoryList}
                    create={CategoryCreate}
                />,
            ]}
        </Admin>
    </MuiPickersUtilsProvider>
)

export default AdminPanel