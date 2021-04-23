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

const validateText = [required(), minLength(1)]
const validateRequired = [required()]

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
            <FileInput
                label="Архив"
                source="file"
                validate={validateRequired}
            >
                <FileField
                    title="Загруженный файл"
                    source="file"
                />
            </FileInput>
        </SimpleForm>
    </Create>
)
