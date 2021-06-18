import {Divider, Typography} from "@material-ui/core"
import Box from "@material-ui/core/Box"
import React from "react"
import CircleNumber from "../../employees/report/CircleNumber"
import HoursTable from "../../employees/report/HoursTable"
import PointsTable from "../../employees/report/PointsTable"
import ProgressBar from "../../employees/report/ProgressBar"
import TasksTable from "../../employees/report/TasksTable"
import useStyles from "../Styles"
import HoursTableFull from "./HoursTableFull"
import TasksTableFull from "./TasksTableFull"

const platoons = {
    '60c1f06122d1851d6068a178': {
        data: {
            issuesNumber: 240,
            issuesCompleted: 229,
            nonScienceHours: 35,
        },
        people: [
            'Арбиев А.М.',
            'Барабанщиков И.Ю.',
            'Воевода Н.Н.',
            'Загребин А.Н.',
            'Захареев А.С.',
            'Зорин Д.О.',
            'Лавриков И.Л.',
            'Лыхин С.А.',
            'Титов В.В.',
            'Чапоргин А.В.',
            'Анисимов И.В.',
            'Бурлаков М.А.',
            'Гапонов П.И.',
            'Емельянов А.В.',
            'Жуков П.Р.',
            'Корчуганов Т.В.',
            'Набиев М.А.',
            'Нереуцкий Д.В.',
            'Сюняев И.Р.',
            'Штолик Е.И.',
        ]
    },
    '60c312903820752c58779beb': {
        data: {
            issuesNumber: 220,
            issuesCompleted: 209,
            nonScienceHours: 35,
        },
        people: [
            'Гринюк Ю.И.',
            'Кокоркин А.С.',
            'Лепчиков А.А.',
            'Молчанов М.В.',
            'Орлов А.А.',
            'Петровский Е.И.',
            'Плотников Д.И.',
            'Семочкин Я.К.',
            'Соколов В.В.',
            'Шацкий А.О.',
            'Якупов Р.Р.',
            'Баталов П.В.',
            'Константинов Е.В.',
            'Никитин С.К.',
            'Пожидаев Н.Б.',
            'Попков Н.Б.',
            'Ризоев Д.С.',
            'Софронов В.С.',
            'Строц Д.А.',
            'Толкачев Я.М.',
        ]
    },
    '60c312ce3820752c58779bec': {
        data: {
            issuesNumber: 220,
            issuesCompleted: 208,
            nonScienceHours: 40,
        },
        people: [
            'Ефимов Д.С.',
            'Енин А.А.',
            'Ермилов Г.С.',
            'Голаев И.С.',
            'Кочетов А.В.',
            'Косовягин К.В.',
            'Курашов И.М.',
            'Ломовцев И.Д.',
            'Маматказин Т.Р.',
            'Морковкин С.А.',
            'Нестеров М.В.',
            'Прилепин О.Е.',
            'Прокопов А.Б.',
            'Радченко Н.А.',
            'Родионов Я.Э.',
            'Рябчунов Д.В.',
            'Рябинин И.И.',
            'Шарыгин Я.В.',
            'Сивцов В.А.',
            'Юрдаэр Д.О.'
        ]
    },
    '60c312e03820752c58779bed': {
        data: {
            issuesNumber: 200,
            issuesCompleted: 189,
            nonScienceHours: 30,
        },
        people: [
            'Ахметгалеев К.М. ',
            'Бакулин В.П. ',
            'Бодрилов П.А. ',
            'Ивахненко И.А.',
            'Непогодьев К.А.',
            'Неруш М.Н.',
            'Носов А.В.',
            'Новиков В.А.',
            'Орехов В.С.',
            'Орленко А.А.',
            'Писарчук А.С.',
            'Рыжков М.Ю.',
            'Савиных В.А.',
            'Селлин А.Ю.',
            'Селютин В.Е.',
            'Середа Д.В.',
            'Шобонов М.С.',
            'Трофимов О.А.',
            'Замараев А.А.'
        ]
    },
    '60c3135e3820752c58779bef': {
        data: {
            issuesNumber: 220,
            issuesCompleted: 207,
            nonScienceHours: 40,
        },
        people: [
            'Аджахунов Э.А.',
            'Капустин А.М.',
            'Каримов Х.Р.',
            'Николаев О.В.',
            'Руднев О.Е.',
            'Алимгузин А.И.',
            'Сабитов Р.А.',
            'Шаповалов Д.А.',
            'Астрединов Р.К.',
            'Галенко И.С.',
            'Гузев С.В.',
            'Иванов А.В.',
            'Карпухин Д.Н.',
            'Кульчицкий А.Е.',
            'Соничев В.В.',
            'Сузиков А.М.',
            'Тудвасов Д.А.',
            'Харитонов И.О.',
            'Черняков В.А.',
            'Шкриба П.М.',
        ]
    },
    '60c313193820752c58779bee': {
        data: {
            issuesNumber: 200,
            issuesCompleted: 196,
            nonScienceHours: 40,
        },
        people: [
            'Андрианов Д.Ю.',
            'Гаврюшин Р.С.',
            'Голубев В.О.',
            'Рубец И.А.',
            'Емцов Р.А.',
            'Шапаренко А.В.',
            'Циммерман А.О.',
            'Скляренко Е.А.',
            'Акимов П.В.',
            'Бахов Т.Б.',
            'Бушуев Д.В.',
            'Гусейнов В.Р.',
            'Дахшукаев В.Р.',
            'Лопухов С.А.',
            'Зарубин Д.С.',
            'Зубарев Ф.А.',
            'Митичкин С.О.',
            'Погарцев К.М.',
            'Сабитов М.А.',
            'Саранцев В.В.',
        ]
    }
}

const Report = ({id}) => {
    const classes = useStyles()
    const {people, data} = platoons[id]

    const numOfPeople = 20
    const score = numOfPeople * (900 + 100 * Math.random())

    return (
        <Box textAlign='center' mb='30px'>
            <Divider style={{margin: '30px 0 60px 0'}}/>
            <Typography variant='h6' style={{marginTop: 30, fontWeight: 'bold'}}>
                Оценка взвода
            </Typography>
            <Box display='flex' width='100%' mt='60px'>
                <CircleNumber num={score | 0} max={1000 * numOfPeople} text='Количество баллов за все время службы'/>
                <CircleNumber num={score / 50 | 0} max={20 * numOfPeople} text='Среднеe количество баллов понедельно'/>
                <CircleNumber
                    num={numOfPeople * (14 + 4 * Math.random()) | 0}
                    max={20 * numOfPeople}
                    text='Количество баллов за прошедшую неделю'
                />
            </Box>
            <Typography className={classes.subtitle}>
                Шкала соответствия баллов за неделю
            </Typography>
            <PointsTable {...{classes, numOfPeople}}/>

            <Typography variant='h6' style={{marginTop: 60, fontWeight: 'bold'}}>
                Отчет взвода за неделю
            </Typography>
            <Typography className={classes.textSecondary}>
                7.05 - 11.06
            </Typography>

            <Typography className={classes.subtitle}>
                Выполнение задач
            </Typography>
            <TasksTable {...{classes, data}}/>
            <ProgressBar
                steps={(data.issuesNumber / numOfPeople || 10) + 1}
                step={numOfPeople}
                activeStep={data.issuesCompleted}
                {...{classes}}
            />
            <TasksTableFull {...{people}}/>

            <Typography className={classes.subtitle}>
                Трудозатраты
            </Typography>
            <HoursTable {...{classes, data, numOfPeople}}/>
            <ProgressBar steps={7} step={100} activeStep={30 * numOfPeople - data.nonScienceHours} {...{classes}}/>
            <HoursTableFull {...{people}}/>
        </Box>
    )
}

export default Report
