import React from 'react'

import {
    ArrayField,
    ArrayInput,
    ChipField,
    Create,
    Datagrid,
    Edit,
    FileField,
    FileInput,
    Filter,
    List,
    minLength,
    NumberInput,
    ReferenceArrayField,
    ReferenceArrayInput,
    ReferenceInput,
    required,
    SelectArrayInput,
    SelectInput,
    Show,
    SimpleForm,
    SimpleFormIterator,
    SimpleShowLayout,
    SingleFieldList,
    TextField,
    TextInput
} from 'react-admin'
import {DescriptionField, HeadlineField} from '../CustomFields'

import {createEmptyPage, createTitle, getBulkActionButtons, getEditActionsWithoutFile, getShowActions} from '../../utils/raUtils'

const validateText = [required(), minLength(1)]
const validateRequired = [required()]


const Title = createTitle('Тезисы доклада', 'headline')
const Empty = createEmptyPage(
    'Нет доступных тезисов докладов',
    'Для добавления тезисов доклада нажмите кнопку "Создать"'
)
const ShowActions = getShowActions()
const EditActions = getEditActionsWithoutFile()
const BulkActionButtons = getBulkActionButtons()

const Filters = (props) => (
    <Filter {...props}>
        <TextInput
            label="Поиск по названию"
            source="headline"
            alwaysOn
        />
        <TextInput
            label="Описание"
            source="description"
        />
        <TextInput
            label="Автор"
            source="authors"
        />
        <ReferenceInput
            perPage={1000}
            label="Подразделение"
            source="subdivisions"
            reference="subdivisions"
        >
            <SelectInput optionText="name"/>
        </ReferenceInput>

    </Filter>
)

export const ListForm = ({permissions, ...props}) => (
    <List
        title="Список тезисов докладов"
        filters={<Filters/>}
        perPage={25}
        exporter={false}
        sort={{field: 'firstCreationDate', order: 'DESC'}}
        empty={<Empty/>}
        bulkActionButtons={<BulkActionButtons permissions={permissions}/>}
        {...props}
    >
        <Datagrid
            rowClick="show"
            expand={<ShowForm enableActions={false}/>}
        >
            <HeadlineField
                label="Название"
                source="headline"
            />
            <DescriptionField
                label="Описание"
                source="description"
                maxchars={250}
            />
            <ArrayField
                source="authors"
                label="Авторы"
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
            <TextField
                label="Год создания"
                source="creationDate"
            />
        </Datagrid>
    </List>
)

export const CreateForm = props => (
    <Create
        title="Добавить тезисы доклада"
        successMessage="Тезисы доклада добавлены"
        undoable={false}
        {...props}
    >
        <SimpleForm
            redirect="list"
            submitOnEnter={false}
        >
            <TextInput
                label="Название"
                source="headline"
                validate={validateText}
                fullWidth
                multiline
            />
            <TextInput
                label="Описание"
                source="description"
                validate={validateText}
                fullWidth
                multiline
            />
            <NumberInput
                label="Год создания"
                source="creationDate"
            />
            <NumberInput
                label="Объем"
                source="volume"
            />
            <ArrayInput
                validate={validateRequired}
                source="authors"
                label="Авторы"
            >
                <SimpleFormIterator>
                    <TextInput
                        label="Автор"
                        source="author"
                    />
                </SimpleFormIterator>
            </ArrayInput>
            <ReferenceArrayInput
                fullWidth
                label="Подразделения"
                reference="subdivisions"
                source="subdivisions"
                perPage={1000}
            >
                <SelectArrayInput optionText="name"/>
            </ReferenceArrayInput>
            <FileInput
                source="file"
                label="Архив"
                validate={validateRequired}
            >
                <FileField
                    source="file"
                    title="Загруженный файл"
                />
            </FileInput>
        </SimpleForm>
    </Create>
)

export const EditForm = props => (
    <Edit
        title={<Title/>}
        successMessage="Тезисы доклада обновлены"
        undoable={false}
        actions={<EditActions/>}
        {...props}
    >
        <SimpleForm submitOnEnter={false}>
            <TextInput
                label="Название"
                source="headline"
                validate={validateText}
                fullWidth
                multiline
            />
            <TextInput
                label="Описание"
                source="description"
                validate={validateText}
                fullWidth
                multiline
            />
            <NumberInput
                label="Год создания"
                source="creationDate"
            />
            <NumberInput
                label="Объем"
                source="volume"
            />
            <ArrayInput
                validate={validateRequired}
                label="Авторы"
                source="authors"
            >
                <SimpleFormIterator>
                    <TextInput
                        label="Автор"
                        source="author"
                    />
                </SimpleFormIterator>
            </ArrayInput>
            <ReferenceArrayInput
                fullWidth
                label="Подразделения"
                reference="subdivisions"
                source="subdivisions"
                perPage={1000}
            >
                <SelectArrayInput optionText="name"/>
            </ReferenceArrayInput>
            <FileField
                source="file.url"
                title="file.title"
                label="Архив"
                target="_blank"
            />
            <FileInput
                source="newfile"
                label="Новый файл"
            >
                <FileField
                    source="src"
                    title="Загруженный файл"
                />
            </FileInput>
        </SimpleForm>
    </Edit>
)

export const ShowForm = ({permissions, enableActions, ...props}) => (
    <Show
        title={<Title/>}
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
                label="Архив"
                target="_blank"
            />
        </SimpleShowLayout>
    </Show>
)

ShowForm.defaultProps = {
    enableActions: true,
}