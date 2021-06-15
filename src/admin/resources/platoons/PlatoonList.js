import React from 'react'
import {Datagrid, Filter, List, TextField, TextInput} from 'react-admin'
import {createEmptyPage, getBulkActionButtons} from '../../utils'
import {PlatoonShow} from './PlatoonShow'

const Empty = createEmptyPage(
    'Нет доступных взводов',
    'Для добавления взвода нажмите кнопку "Создать"'
)
const BulkActionButtons = getBulkActionButtons()

export const PlatoonList = ({permissions, ...props}) => (
    <List
        title="Взвода"
        filters={<Filters/>}
        perPage={25}
        exporter={false}
        sort={{field: 'firstCreationDate', order: 'DESC'}}
        empty={<Empty/>}
        bulkActionButtons={<BulkActionButtons permissions={permissions}/>}
        {...props}
    >
        <Datagrid
            rowClick="show"
            expand={<PlatoonShow enableActions={false}/>}
        >
            <TextField
                label="Название"
                source="name"
            />
            <TextField
                label="Специальность"
                source="specialty"
            />
            <TextField
                label="Командир взвода"
                source="platoonCommander"
            />
        </Datagrid>
    </List>
)

const Filters = (props) => (
    <Filter {...props}>
        <TextInput
            label="Название"
            source="name"
            alwaysOn
        />
        <TextInput
            label="Специальность"
            source="specialty"
        />
        <TextField
            label="Командир взвода"
            source="platoonCommander"
        />
    </Filter>
)
