import React from 'react'

import {Create, Datagrid, List, minLength, required, SimpleForm, TextField, TextInput,} from 'react-admin'
import {createEmptyPage} from "../../utils/raUtils"

const Empty = createEmptyPage(
    'Нет доступных характеров работы',
    'Для добавления нового характера работы нажмите кнопку "Создать"'
)
const validateName = [required(), minLength(1)]

export const CreateForm = props => (
    <Create
        title="Добавить новый характер работы"
        successMessage="Характер работы добавлен"
        undoable={false}
        {...props}>
        <SimpleForm
            redirect="list"
            submitOnEnter={false}
        >
            <TextInput
                fullWidth
                label="Категория"
                source="name"
                validate={validateName}
            />
        </SimpleForm>
    </Create>
)

export const ListForm = props => (
    <List
        title="Список характеров работы"
        perPage={25}
        exporter={false}
        sort={{field: 'firstCreationDate', order: 'DESC'}}
        empty={<Empty/>}
        {...props}
    >
        <Datagrid>
            <TextField
                label="Название"
                source="name"
            />
        </Datagrid>
    </List>
)
