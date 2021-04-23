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

const Title = createTitle('Программа', 'headline')
const ShowActions = getShowActions()

export const ProgramShow = ({permissions, enableActions = true, ...props}) => {
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
                    label="Описание"
                    source="description"
                />
                <ChipField
                    label="Год создания"
                    source="creationDate"
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
                    reference="subdivisions"
                    source="subdivisions"
                >
                    <SingleFieldList>
                        <ChipField source="name"/>
                    </SingleFieldList>
                </ReferenceArrayField>
                <FileField
                    source="file.url"
                    title="file.title"
                    label="Архив с программой"
                    target="_blank"
                />
                <ChipField
                    label='Код свидетельства'
                    source='certificate.code'
                    emptyText='-'
                />
                <FileField
                    label="Свидетельство"
                    source="certificate.file.url"
                    title="certificate.code"
                    emptyText='-'
                    target="_blank"
                />
            </SimpleShowLayout>
        </Show>
    )
}
