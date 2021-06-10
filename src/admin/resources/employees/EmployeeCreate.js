import React from 'react'
import {Create, ImageField, ImageInput, minLength, NumberInput, required, SimpleForm, TextInput} from 'react-admin'

const validateText = [required(), minLength(1)]

export const EmployeeCreate = (props) => (
    <Create
        title="Добавить сотрудника"
        successMessage="ra.resources.employee.create"
        undoable={false}
        style={{width: '100%', maxWidth: 1050, margin: '0 auto'}}
        {...props}
    >
        <SimpleForm
            redirect="list"
            submitOnEnter={false}
        >
            <ImageInput
                label="Фото"
                source="file"
            >
                <ImageField
                    source="src"
                    title="Загруженное фото"
                />
            </ImageInput>
            <TextInput
                label="ФИО"
                source="name"
                validate={validateText}
                fullWidth
            />
            <TextInput
                label="Дата рождения"
                source="birthDate"
                fullWidth
            />
            <TextInput
                label="Место рождения"
                source="birthPlace"
                fullWidth
            />
            <TextInput
                label="Национальность"
                source="nationality"
                fullWidth
            />
            <TextInput
                label="Образование"
                source="education"
                fullWidth
            />
            <TextInput
                label="Окончил (когда, что)"
                source="university"
                fullWidth
            />
            <TextInput
                label="Специальность"
                source="specialty"
                fullWidth
            />
            <TextInput
                label="Владение иностранными языками"
                source="languages"
                fullWidth
            />
            <TextInput
                label="Призван (каким ВК)"
                source="militaryCommissariat"
                fullWidth
            />
            <TextInput
                label="Воинское звание"
                source="militaryRank"
                fullWidth
            />
            <TextInput
                label="Дата призыва"
                source="draftDate"
                fullWidth
            />
            <TextInput
                label="Работа до призыва в армию"
                source="jobBefore"
                fullWidth
            />
            <TextInput
                label='Научная тема в ВИТ "ЭРА"'
                source="researchTopic"
                fullWidth
            />
            <TextInput
                label='Достижения в научной деятельности во время службы в ВИТ "ЭРА"'
                source="achievements"
                fullWidth
            />
            <TextInput
                label='Работа после увольнения из ВИТ "ЭРА"'
                source="jobAfter"
                fullWidth
            />
            <NumberInput
                label='ID сотрудника в системе "Redmine"'
                source="redmineId"
                fullWidth
            />
        </SimpleForm>
    </Create>
)
