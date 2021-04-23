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

const validate = [required()]
const validateLength = [required(), minLength(1)]


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
            <ReferenceInput
                label="Категория"
                source="category"
                reference="categories"
            >
                <SelectInput optionText="name"/>
            </ReferenceInput>
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
            <NumberInput
                label="Год создания"
                source="creationDate"
                validate={validateRequired}
                options={{format: dateFormat, cancelLabel: cancelLabel}}
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
