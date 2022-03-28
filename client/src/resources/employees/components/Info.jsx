import { Divider } from '@mui/material'
import Box from '@mui/material/Box'
import { GridShowLayout, RaGrid } from 'ra-compact-ui/dist/details'
import React from 'react'
import { ImageField, TextField, useRecordContext } from 'react-admin'
import photoPlaceholder from '../../../assets/photo-placeholder.jpg'
import styles from '../Styles'

const Info = ({ children }) => {
	const { platoonNumber, companyNumber } = useRecordContext()
	
	return (
		<Box mt='15px' mb='30px'>
			<GridShowLayout>
				<RaGrid container spacing={2}>
					<RaGrid item xs={12} md={6}>
						<div sx={styles.rightSide}>
							<ImageField
								label={null}
								source='file.url'
								title='file.title'
								emptyText={<img src={photoPlaceholder} alt='photo'/>}
								sx={styles.photo}
							/>
						</div>
					</RaGrid>
					<RaGrid item xs sx={styles.rightSide}>
						<TextField
							label='ФИО'
							source='name'
							style={{ fontSize: '1.15rem', fontWeight: 'bold' }}
						/>
						<span label='Должность' addLabel>
							Оператор <b>{platoonNumber}</b> взвода <b>{companyNumber}</b> НР
						</span>
						<TextField
							label='Воинское звание'
							source='militaryRank'
						/>
						<TextField
							label='Национальность'
							source='nationality'
						/>
					</RaGrid>
				</RaGrid>
				<Divider style={{ margin: '30px 0 60px 0' }}/>
				<RaGrid container spacing={2}>
					<RaGrid item xs={12} md={6}>
						<TextField
							label='Дата рождения'
							source='birthDate'
						/>
						<TextField
							label='Образование'
							source='education'
						/>
						<TextField
							label='Специальность'
							source='specialty'
						/>
						<TextField
							label='Дата призыва'
							source='draftDate'
						/>
						<TextField
							label='Научная тема в ВИТ "ЭРА"'
							source='researchTopic'
						/>
						<TextField
							label='Работа до призыва в ВИТ "ЭРА"'
							source='jobBefore'
						/>
					</RaGrid>
					<RaGrid item xs>
						<TextField
							label='Место рождения'
							source='birthPlace'
						/>
						<TextField
							label='Окончил (когда, что)'
							source='university'
						/>
						<TextField
							label='Владение иностранными языками'
							source='languages'
						/>
						<TextField
							label='Призван (каким ВК)'
							source='militaryCommissariat'
						/>
						<TextField
							label='Достижения во время службы в ВИТ "ЭРА"'
							source='achievements'
						/>
						<TextField
							label='Работа после увольнения из ВИТ "ЭРА"'
							source='jobAfter'
						/>
					</RaGrid>
				</RaGrid>
				{children}
			</GridShowLayout>
		</Box>
	)
}

export default Info
