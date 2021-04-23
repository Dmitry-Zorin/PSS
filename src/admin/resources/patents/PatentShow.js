import React from 'react'
import {
    ArrayField,
    ChipField,
    FileField,
    ReferenceArrayField,
    Show,
    SimpleShowLayout,
    SingleFieldList,
    TextField
} from 'react-admin'
import {createTitle, getShowActions} from '../../utils'

const Title = createTitle('Петент', 'headline')

const ShowActions = getShowActions()

export const PatentShow = ({permissions, enableActions = true, ...props}) => {
    const actions = enableActions ? <ShowActions permissions={permissions}/> : undefined
    return (
        <Show
            title={<Title/>}
            actions={actions}
            {...props}
        >
            <SimpleShowLayout>
                <TextField
                    label="Название"
                    source="headline"
                />
                <TextField
                    label="Описание"
                    source="description"
                />
                <ChipField
                    label="Год создания"
                    source="creationDate"
                />
                <TextField
                    label="Объем"
                    source="volume"
                    emptyText="-"
                />
                <ArrayField
                    label="Авторы"
                    source="authors"
                >
                    <SingleFieldList linkType={false}>
                        <ChipField
                            label="Автор"
                            source="author"
                        />
                    </SingleFieldList>
                </ArrayField>
                <ReferenceArrayField
                    label="Подразделения"
                    source="subdivisions"
                    reference="subdivisions"
                >
                    <SingleFieldList>
                        <ChipField source="name"/>
                    </SingleFieldList>
                </ReferenceArrayField>
                <FileField
                    label="Архив"
                    source="file.url"
                    title="file.title"
                    target="_blank"
                />
            </SimpleShowLayout>
        </Show>
    )
}
