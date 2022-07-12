import { Typography } from '@mui/material'
import { MainArea } from 'components'
import { useTranslate } from 'react-admin'

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
