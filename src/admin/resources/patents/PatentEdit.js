import React from 'react'
import {
    ArrayInput,
    Edit,
    FileField,
    FileInput,
    minLength,
    NumberInput,
    ReferenceArrayInput,
    required,
    SelectArrayInput,
    SimpleForm,
    SimpleFormIterator,
    TextInput
} from 'react-admin'
import {createTitle, getEditActionsWithoutFile} from '../../utils'

const validateText = [required(), minLength(1)]
const validateRequired = [required()]
const Title = createTitle('Петент', 'headline')

const EditActions = getEditActionsWithoutFile()

export const PatentEdit = props => (
    <Edit
        title={<Title/>}
        successMessage="Патент обновлен"
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
            />
            <TextInput
                label="Описание"
                source="description"
                validate={validateText}
                fullWidth
                multiline
            />
            <TextInput
                label="Вид работы"
                source="type"
                validate={validateText}
            />
            <NumberInput
                label="Год создания"
                source="creationDate"
                validate={validateRequired}
            />
            <NumberInput
                label="Объем"
                source="volume"
            />
            <ArrayInput
                label="Авторы"
                source="authors"
                validate={validateRequired}
            >
                <SimpleFormIterator>
                    <TextInput
                        label="Автор"
                        source="author"
                    />
                </SimpleFormIterator>
            </ArrayInput>
            <ReferenceArrayInput
                label="Подразделения"
                source="subdivisions"
                reference="subdivisions"
                perPage={1000}
                fullWidth
            >
                <SelectArrayInput optionText="name"/>
            </ReferenceArrayInput>
            <FileField
                label="Архив"
                source="file.url"
                title="file.title"
                target="_blank"
            />
            <FileInput
                label="Новый файл"
                source="newfile"
            >
                <FileField
                    title="Загруженный файл"
                    source="src"
                />
            </FileInput>
        </SimpleForm>
    </Edit>
)
