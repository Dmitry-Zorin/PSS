import React from 'react'
import {
	ArrayInput,
	Create,
	FileField,
	FileInput,
	minLength,
	NumberInput,
	ReferenceInput,
	required,
	SelectInput,
	SimpleForm,
	SimpleFormIterator,
	TextInput
} from 'react-admin'
import {DateInput} from 'react-admin-date-inputs2'

const validate = [required()]
const validateLength = [required(), minLength(1)]

const dateFormat = 'dd.MM.yyyy'
const cancelLabel = 'Отмена'

export const OtherCreate = (props) => (
    <Create
        title="Добавить научный труд"
        successMessage="Научный труд добавлен"
        undoable={false}
        {...props}>
        <SimpleForm
            redirect="list"
            submitOnEnter={false}
        >
            <TextInput
                label="Тип работы"
                source="type"
                validate={validateLength}
				fullWidth
            />
            <TextInput
                label="Название"
                source="headline"
                validate={validateLength}
				fullWidth
            />
            <TextInput
                label="Описание"
                source="text"
                validate={validateLength}
				fullWidth
				multiline
            />
            <DateInput
                label="Дата создания"
                source="creationDate"
                validate={validate}
                options={{format: dateFormat, cancelLabel: cancelLabel}}
            />
            <ArrayInput
                validate={validate}
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
            <ReferenceInput
                label="Характер работы"
                source="character"
                reference="characters"
            >
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput
                label="Выходные данные"
                source="exitData"
                fullWidth
                multiline
            />
            <NumberInput
                label="Кол-во страниц"
                source="pages"
            />
            <FileInput
                source="file"
                label="Файл"
            >
                <FileField
                    source="file"
                    title="Загруженный файл"
                />
            </FileInput>
        </SimpleForm>
    </Create>
)
