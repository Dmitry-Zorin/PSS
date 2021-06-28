import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle"
import React from 'react'
import Grade from "../employees/components/Grade"
import Info from "./components/Info"
import {PeopleShow} from "../employees/components/PeopleShow"
import Report from "../employees/components/Report"

export const PlatoonShow = (props) => (
    <PeopleShow
        info={{
            icon: <SupervisedUserCircleIcon/>,
            resource: 'platoons',
            title: 'Взвода',
            label: 'Взвод',
            whose: 'взвода',
            numOfPeople: 20
        }}
        tabs={[<Info/>, <Grade/>, <Report/>]}
        {...props}
    />
)
