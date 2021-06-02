import {makeStyles} from "@material-ui/core/styles"
import {GridShowLayout, RaGrid} from 'ra-compact-ui/dist/details'
import React from 'react'
import {ImageField, Show, TextField} from 'react-admin'
import {createTitle, getShowActions} from '../../utils'
import photoPlaceholder from '../../../../static/images/photo-placeholder.jpg'

const Title = createTitle('Сотрудник', 'name')
const TitleShort = createTitle('', 'name')

const ShowActions = getShowActions()

const useStyles = makeStyles(theme => (
    {
        photo: {
            '& > img': {
                width: '100%',
                height: 'auto',
                margin: 0
            }
        },
        rightSide: {
            display: 'flex',
            flexDirection: 'column',
            '& > div': {
                flex: 1
            }
        }
    }
))

export const EmployeeShow = ({permissions, enableActions = true, ...props}) => {
    const classes = useStyles()

    return (
        <Show
            title={enableActions ? <Title/> : <TitleShort/>}
            actions={!enableActions ? undefined : (
                <ShowActions permissions={permissions}/>
            )}
            style={{width: '100%', maxWidth: 1050, margin: '0 auto'}}
            {...props}
        >
            <GridShowLayout>
                <RaGrid container spacing={2}>
                    <RaGrid item md={6} lg={4}>
                        <ImageField
                            label="Фото"
                            source='file.url'
                            title='file.title'
                            emptyText={<img src={photoPlaceholder} alt='photo'/>}
                            className={classes.photo}
                        />
                    </RaGrid>
                    <RaGrid item xs className={classes.rightSide}>
                        <TextField
                            label="ФИО"
                            source="name"
                            style={{fontSize: '1rem'}}
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
                <RaGrid container spacing={2}>
                    <RaGrid item sm={12} md={6}>
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
                    <RaGrid item sm={12} md={6}>
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
            </GridShowLayout>
        </Show>
    )
}
