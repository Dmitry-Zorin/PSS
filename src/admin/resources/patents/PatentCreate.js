import React from 'react'
import {
    ArrayInput,
    Create,
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
const validateHeadline = [required(), minLength(1)]
const validateDescription = [required(), minLength(1)]
const validateCreationDate = [required()]
const validateAuthors = [required()]
const validateFile = [required()]

export const PatentCreate = (props) => (
    <Create
        title="Добавить патент"
        successMessage="Патент добавлен"
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
                validate={validateHeadline}
                fullWidth
            />
            <TextInput
                label="Описание"
                source="description"
                validate={validateDescription}
                fullWidth
                multiline
            />
            <NumberInput
                label="Год создания"
                source="creationDate"
                validate={validateCreationDate}
            />
            <ArrayInput
                label="Авторы"
                source="authors"
                validate={validateAuthors}
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
            <FileInput
                label="Архив"
                source="file"
                validate={validateFile}
            >
                <FileField
                    title="Загруженный файл"
                    source="file"
                />
            </FileInput>
        </SimpleForm>
    </Create>
)
