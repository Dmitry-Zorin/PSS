import { Typography } from '@mui/material'
import { useTranslate } from 'react-admin'
import { MainArea } from '~/components'

const About = () => {
	const translate = useTranslate()

	return (
		<>
			<MainArea title={translate('metadata.title')}>
				<Typography variant="body1">
					{translate('metadata.description')}
				</Typography>
			</MainArea>
		</>
	)
}

export default About
