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

const validateHeadline = [required(), minLength(1)]
const validateDescription = [required(), minLength(1)]
const validateCreationDate = [required()]
const validateAuthors = [required()]
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
