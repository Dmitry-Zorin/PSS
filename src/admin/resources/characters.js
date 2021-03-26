import React from 'react'

import {
    Create,
    minLength,
    required,
    SimpleForm,
    TextInput,
} from 'react-admin'

const validateName = [required(), minLength(1)]

export const CreateForm = props => (
    <Create
        title="Добавить место публикации"
        successMessage="Место публикации добавлено"
        undoable={false}
        {...props}>
        <SimpleForm
            redirect="list"
            submitOnEnter={false}
        >
            <TextInput
                fullWidth
                label="Место публикации"
                source="name"
                validate={validateName}
            />
        </SimpleForm>
    </Create>
)
