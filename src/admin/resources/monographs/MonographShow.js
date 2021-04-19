import React from 'react'
import {
    ArrayField,
    ChipField,
    DateField,
    FileField,
    NumberField,
    ReferenceArrayField,
    ReferenceField,
    Show,
    SimpleShowLayout,
    SingleFieldList,
    TextField
} from 'react-admin'
import {createTitle, getShowActions} from '../../utils'

const Title = createTitle('Монография', 'headline')
const ShowActions = getShowActions()

export const MonographShow = ({permissions, enableActions = true, ...props}) => {
    const actions = enableActions ? <ShowActions permissions={permissions}/> : false
    return (
        <Show
            title={<Title/>}
            actions={actions}
            {...props}>
            <SimpleShowLayout>
                <TextField
                    label="Название"
                    source="headline"
                />
                <TextField
                    label="Аннотация"
                    source="text"
                />
                <DateField
                    label="Дата создания"
                    source="creationDate"
                    locales="ru-RU"
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
                <ReferenceField
                    label="Место публикации"
                    source="publicationPlace"
                    reference="publications"
                    link=""
                >
                    <TextField source="name"/>
                </ReferenceField>
                <ReferenceArrayField label="Подразделения" reference="subdivisions" source="subdivisions">
                    <SingleFieldList>
                        <ChipField source="name"/>
                    </SingleFieldList>
                </ReferenceArrayField>
                <TextField
                    label="Выходные данные"
                    source="exitData"
                    emptyText='-'
                />
                <NumberField
                    label="Кол-во страниц"
                    source="pages"
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
                    label="PDF файл"
                    target="_blank"
                />
            </SimpleShowLayout>
        </Show>
    )
}
