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

export const ProgramCreate = props => (
    <Create
        title="Добавить программу"
        successMessage="Программа добавлена"
        undoable={false}
        {...props}>
        <SimpleForm
            redirect="list"
            submitOnEnter={false}
        >
            <TextInput
                fullWidth
                label="Название"
                source="headline"
                validate={validateText}
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
                label="Архив с программой"
                validate={validateRequired}
            >
                <FileField
                    source="file"
                    title="Загруженный файл"
                />
            </FileInput>
            <TextInput
                label='Код свидетельства'
                source='certificateCode'
            />
            <FileInput
                label="Свидетельство"
                source="certificateFile"
            >
                <FileField
                    title="Загруженное свидетельство"
                    source="certificateFile"
                />
            </FileInput>
        </SimpleForm>
    </Create>
)
