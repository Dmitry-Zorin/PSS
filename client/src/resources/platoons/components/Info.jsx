import Box from '@mui/material/Box'
import { GridShowLayout, RaGrid } from 'ra-compact-ui/dist/details'
import React from 'react'
import { ImageField, NumberField, TextField } from 'react-admin'
import photoPlaceholder from '../../../assets/photo-placeholder.jpg'
import styles from '../../employees/Styles'

const Info = () => (
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
						label='Название'
						source='name'
						style={{ fontSize: '1.15rem', fontWeight: 'bold' }}
					/>
					<TextField
						label='Направление'
						source='specialty'
					/>
					<TextField
						label='Командир взвода'
						source='platoonCommander'
					/>
					<NumberField
						label='Количество операторов'
						source='numOfPeople'
					/>
				</RaGrid>
			</RaGrid>
		</GridShowLayout>
	</Box>
)

export default Info
