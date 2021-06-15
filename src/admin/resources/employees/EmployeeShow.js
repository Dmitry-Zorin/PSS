import {Divider} from "@material-ui/core"
import {GridShowLayout, RaGrid} from 'ra-compact-ui/dist/details'
import React from 'react'
import {ImageField, Show, TextField} from 'react-admin'
import photoPlaceholder from '../../../../static/images/photo-placeholder.jpg'
import {createTitle, getShowActions} from '../../utils'
import Report from "./report/Report"
import useStyles from "./Styles"

const Title = createTitle('Сотрудник', 'name')
const TitleShort = createTitle('', 'name')

const ShowActions = getShowActions()

export const EmployeeShow = ({permissions, enableActions = true, ...props}) => {
    const classes = useStyles()

    return (
        <Show
            title={enableActions ? <Title/> : <TitleShort/>}
            actions={!enableActions ? undefined : (
                <ShowActions permissions={permissions}/>
            )}
            className={classes.container}
            {...props}
        >
            <GridShowLayout>
                <RaGrid container spacing={2}>
                    <RaGrid item xs={12} md={6}>
                        <div className={classes.rightSide}>
                            <ImageField
                                label={null}
                                source='file.url'
                                title='file.title'
                                emptyText={<img src={photoPlaceholder} alt='photo'/>}
                                className={classes.photo}
                            />
                        </div>
                    </RaGrid>
                    <RaGrid item xs className={classes.rightSide}>
                        <TextField
                            label="ФИО"
                            source="name"
                            style={{fontSize: '1.15rem', fontWeight: 'bold'}}
                        />
                        <TextField
                            label="Воинское звание"
                            source="militaryRank"
                        />
                        <TextField
                            label="Дата рождения"
                            source="birthDate"
                        />
                        <TextField
                            label="Место рождения"
                            source="birthPlace"
                        />
                        <TextField
                            label="Национальность"
                            source="nationality"
                        />
                    </RaGrid>
                </RaGrid>
                <Divider style={{margin: '30px 0 60px 0'}}/>
                <RaGrid container spacing={2}>
                    <RaGrid item xs={12} md={6}>
                        <TextField
                            label="Образование"
                            source="education"
                        />
                        <TextField
                            label="Специальность"
                            source="specialty"
                        />
                        <TextField
                            label="Дата призыва"
                            source="draftDate"
                        />
                        <TextField
                            label='Научная тема в ВИТ "ЭРА"'
                            source="researchTopic"
                        />
                        <TextField
                            label="Работа до призыва в армию"
                            source="jobBefore"
                        />
                    </RaGrid>
                    <RaGrid item xs>
                        <TextField
                            label="Окончил (когда, что)"
                            source="university"
                        />
                        <TextField
                            label="Владение иностранными языками"
                            source="languages"
                        />
                        <TextField
                            label="Призван (каким ВК)"
                            source="militaryCommissariat"
                        />
                        <TextField
                            label='Достижения в научной деятельности во время службы в ВИТ "ЭРА"'
                            source="achievements"
                        />
                        <TextField
                            label='Работа после увольнения из ВИТ "ЭРА"'
                            source="jobAfter"
                        />
                    </RaGrid>
                </RaGrid>
                <Report id={props.id}/>
            </GridShowLayout>
        </Show>
    )
}
