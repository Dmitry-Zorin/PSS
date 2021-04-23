import React from 'react'
import {
    ArrayInput,
    Edit,
    FileField,
    FileInput,
    minLength,
    NumberInput,
    ReferenceArrayInput,
    ReferenceInput,
    required,
    SelectArrayInput,
    SelectInput,
    SimpleForm,
    SimpleFormIterator,
    TextInput
} from 'react-admin'
import {createTitle, getEditActionsWithoutFile} from '../../utils'

const validateText = [required(), minLength(1)]
const validateRequired = [required()]
const Title = createTitle('Отчет', 'headline')

const EditActions = getEditActionsWithoutFile()

export const ReportEdit = (props) => (
    <Edit
        title={<Title/>}
        successMessage="Отчет обновлен"
        undoable={false}
        actions={<EditActions/>}
        {...props}>
        <SimpleForm submitOnEnter={false}>
            <TextInput
                fullWidth
                label="Название"
                source="headline"
                validate={validateText}
            />
            <TextInput
                label="Аннотация"
                source="text"
                validate={validateText}
                fullWidth
                multiline
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
            <ReferenceInput
                label="Место публикации"
                source="publicationPlace"
                reference="publications"
            >
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <ReferenceArrayInput
                fullWidth
                label="Подразделения"
                reference="subdivisions"
                source="subdivisions"
                perPage={1000}
            >
                <SelectArrayInput optionText="name"/>
            </ReferenceArrayInput>
            <TextInput
                label="Выходные данные"
                source="exitData"
                fullWidth
                multiline
            />
            <ReferenceInput
                label="Характер работы"
                source="character"
                reference="characters"
            >
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <FileField
                source="file.url"
                title="file.title"
                label="PDF файл"
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
