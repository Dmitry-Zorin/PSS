import React from 'react'

import {
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    Filter,
    List,
    minLength,
    NullableBooleanInput,
    required,
    Show,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput
} from 'react-admin'
import {createEmptyPage, createTitle, getShowActions} from '../utils'

const validateLoginExistsOnCreate = (values) => (
    fetch(`${process.env.SERVER}/api/users/unique`, {
        method: 'POST',
        body: JSON.stringify({login: values.login}),
        headers: {'Content-Type': 'application/json'}
    })
        .then(data => data.json())
        .then(data => {
            if (data.exists) return {login: 'Логин занят'}
            else return undefined
        })
        .catch(() => (
            {login: 'Internal error, please try again'}
        ))
)

const validateLogin = [required(), minLength(1)]
const validatePassword = [required(), minLength(8)]

const Title = createTitle('Пользователи', 'login')
const Empty = createEmptyPage(
    'Нет зарегистрированных пользователей',
    'Для добавления пользователя нажмите кнопку "Создать"'
)
const ShowActions = getShowActions()

const Filters = (props) => (
    <Filter {...props}>
        <TextInput
            label="Поиск по логину"
            source="login"
            alwaysOn
        />
        <NullableBooleanInput
            label="Администратор"
            source="isAdmin"
            displayNull
        />
    </Filter>
)

export const ListForm = props => (
    <List
        title="Список пользователей"
        filters={<Filters/>}
        perPage={25}
        exporter={false}
        sort={{field: 'firstCreationDate', order: 'DESC'}}
        empty={<Empty/>}
        {...props}
    >
        <Datagrid
            rowClick="show"
            expand={<ShowForm enableActions={false}/>}
        >
            <TextField
                label="Логин"
                source="login"
            />
            {/* <TextField
                label="Пароль"
                source="password" /> */}
            <BooleanField
                label="Администратор"
                source="isAdmin"
            />
        </Datagrid>
    </List>
)

export const CreateForm = props => (
    <Create
        title="Добавить пользователя"
        successMessage="Пользователь добавлен"
        undoable={false}
        {...props}>
        <SimpleForm
            validate={validateLoginExistsOnCreate}
            redirect="list"
            submitOnEnter={false}
        >
            <TextInput
                fullWidth
                label="Логин"
                source="login"
                validate={validateLogin}
            />
            <TextInput
                fullWidth
                label="Пароль"
                source="password"
                validate={validatePassword}
            />
            <BooleanInput
                label="Администратор"
                source="isAdmin"
            />
        </SimpleForm>
    </Create>
)

export const ShowForm = ({enableActions, ...props}) => (
    <Show
        title={<Title/>}
        actions={enableActions && <ShowActions permissions={permissions}/>}
        {...props}>
        <SimpleShowLayout>
            <TextField
                label="Логин"
                source="login"
            />
            {/* <TextField
                    label="Пароль"
                    source="password" /> */}
            <BooleanField
                label="Администратор"
                source="isAdmin"
            />
        </SimpleShowLayout>
    </Show>
)