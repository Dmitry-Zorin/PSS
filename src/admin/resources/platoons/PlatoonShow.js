import {GridShowLayout, RaGrid} from 'ra-compact-ui/dist/details'
import React from 'react'
import {ImageField, Show, TextField, NumberField} from 'react-admin'
import photoPlaceholder from '../../../../static/images/photo-placeholder.jpg'
import {createTitle, getShowActions} from '../../utils'
import Report from "./report/Report"
import useStyles from "./Styles"

const Title = createTitle('Взвод', 'name')
const TitleShort = createTitle('', 'name')

const ShowActions = getShowActions()

export const PlatoonShow = ({permissions, enableActions = true, ...props}) => {
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
                            label="Название"
                            source="name"
                            style={{fontSize: '1.15rem', fontWeight: 'bold'}}
                        />
                        <TextField
                            label="Специальность"
                            source="specialty"
                        />
                        <TextField
                            label="Командир взвода"
                            source="platoonCommander"
                        />
                        <NumberField
                            label="Количество операторов"
                            source="numOfPeople"
                        />
                    </RaGrid>
                </RaGrid>
                <Report id={props.id}/>
            </GridShowLayout>
        </Show>
    )
}
