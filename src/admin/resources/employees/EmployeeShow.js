import {Divider, Typography} from "@material-ui/core"
import React from 'react'
import Info from "./components/Info"
import ButtonForm16 from "./components/ButtonForm16"
import Grade from "./components/Grade"
import {PeopleShow} from "./components/PeopleShow"
import Report from "./components/Report"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"

export const EmployeeShow = (props) => (
    <PeopleShow
        info={{
            icon: <AccountCircleIcon/>,
            resource: 'employees',
            title: 'Сотрудник',
            label: 'Оператор',
            whose: 'оператора',
            numOfPeople: 1
        }}
        tabs={[<Tab1/>, <Grade/>, <Report/>]}
        {...props}
    />
)

const Tab1 = () => (
    <Info>
        <Divider style={{margin: '30px 0 60px 0'}}/>
        <Typography variant='h6' style={{
            textAlign: 'center',
            marginTop: 30,
            fontWeight: 'bold'
        }}>
            Форма №16
        </Typography>
        <ButtonForm16/>
    </Info>
)
