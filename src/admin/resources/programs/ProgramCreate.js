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
                validate={validateHeadline}
            />
            <TextInput
                fullWidth
                label="Описание"
                multiline
                source="description"
                validate={validateDescription}
            />
            <NumberInput
                label="Год создания"
                source="creationDate"
                validate={validateCreationDate}
            />
            <ArrayInput
                validate={validateAuthors}
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
                validate={validateFile}
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
