import { Divider, Typography } from '@mui/material'
import { MainArea } from 'components'
import { AppBar } from 'layout'
import { ReactNode } from 'react'
import { useTranslate } from 'react-admin'

const Subtitle = ({ children }: { children: ReactNode }) => (
	<Divider sx={{ mt: 6, mb: 2, mx: 4 }}>
		<Typography component="h2" variant="h4">
			{children}
		</Typography>
	</Divider>
)

const About = () => {
	const translate = useTranslate()

	return (
		<>
			<AppBar />
			<MainArea>
				<Typography component="h1" variant="h2" textAlign="center" pb={3}>
					{translate('metadata.title')}
				</Typography>
				<Typography>
					To provide an optimized experience on mobile, tablet, and desktop
					devices, you often need to display different components depending on
					the screen size.
				</Typography>
				<Subtitle>{translate('resources.timeline.name')}</Subtitle>
				<Typography>
					MUI provides a hook dedicated to help such responsive layouts:
					useMediaQuery. It expects a function receiving the MUI theme as a
					parameter, and returning a media query.
				</Typography>
				<Subtitle>
					{translate('resources.create-publication-list.name')}
				</Subtitle>
				<Typography>
					Use the theme breakpoints to check for common screen sizes. The hook
					returns a boolean indicating if the current screen matches the media
					query or not.
				</Typography>
			</MainArea>
		</>
	)
}

export default About