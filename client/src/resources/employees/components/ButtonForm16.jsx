import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import React from 'react'
import { useDataProvider, useNotify, useRecordContext } from 'react-admin'
import { getResourceData } from '../../../requests'

const ButtonForm16 = () => {
	const dataProvider = useDataProvider()
	const notify = useNotify()
	const { name, companyNumber, militaryRank } = useRecordContext()

	const generateForm = async () => {
		const { createForm16 } = await import('../../../form16')
		const title = `Оператор ${companyNumber} НР, ${militaryRank.toLowerCase()}`
		const resourceData = await getResourceData(dataProvider, notify, name)
		await createForm16(resourceData, name, name, title)
	}

	return (
		<Box display='flex' justifyContent='center' mt='30px'>
			<Button
				color='primary'
				variant='contained'
				onClick={generateForm}
				style={{ height: 45 }}
			>
				Создать список научных работ
			</Button>
		</Box>
	)
}

export default ButtonForm16
