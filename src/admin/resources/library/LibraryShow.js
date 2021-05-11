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

const Title = createTitle('Книга', 'headline')
const TitleShort = createTitle('', 'headline')

const ShowActions = getShowActions()

export const LibraryShow = ({permissions, enableActions = true, ...props}) => (
    <Show
        title={enableActions ? <Title/> : <TitleShort/>}
        actions={enableActions && <ShowActions permissions={permissions}/>}
        {...props}
    >
        <SimpleShowLayout>
            <TextField
                label="Название"
                source="headline"
            />
            <TextField
                label="Описание"
                source="text"
            />
            <ArrayField
                label="Ключевые слова"
                source="tags"
            >
                <SingleFieldList linkType={false}>
                    <ChipField
                        label="Ключевое слово"
                        source="tag"
                    />
                </SingleFieldList>
            </ArrayField>
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
                label="Файл"
                source="file.url"
                title="file.title"
                target="_blank"
            />
        </SimpleShowLayout>
    </Show>
)
