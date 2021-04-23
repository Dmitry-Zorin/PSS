import React from 'react'
import {
    ArrayField,
    ChipField,
    FileField,
    ReferenceField,
    Show,
    SimpleShowLayout,
    SingleFieldList,
    TextField
} from 'react-admin'
import {createTitle, getShowActions} from '../../utils'

const Title = createTitle('Научный труд', 'headline')
const ShowActions = getShowActions()

export const OtherShow = ({permissions, enableActions = true, ...props}) => {
    const actions = enableActions ? <ShowActions permissions={permissions}/> : false
    return (
        <Show
            title={<Title/>}
            actions={actions}
            {...props}>
            <SimpleShowLayout>
                <TextField
                    label="Тип работы"
                    source="type"
                />
                <ReferenceField
                    label="Категория"
                    source="category"
                    reference="categories"
                >
                    <ChipField source="name"/>
                </ReferenceField>
                <TextField
                    label="Название"
                    source="headline"
                />
                <TextField
                    label="Описание"
                    source="text"
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
                <TextField
                    label="Выходные данные"
                    source="exitData"
                    emptyText='-'
                />
                <ReferenceField
                    label="Характер работы"
                    source="character"
                    reference="characters"
                >
                    <ChipField source="name"/>
                </ReferenceField>
                <FileField
                    source="file.url"
                    title="file.title"
                    label="Файл"
                    target="_blank"
                />
            </SimpleShowLayout>
        </Show>
    )
}
