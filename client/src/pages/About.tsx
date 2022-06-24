import { Divider, Typography } from '@mui/material'
import MainArea from 'components/MainArea'
import { ReactNode } from 'react'
import { useTranslate } from 'react-admin'

const Subtitle = ({ children }: { children: ReactNode }) => (
	<Divider sx={{ mt: 6, mb: 2, mx: 4 }}>
		<Typography color="primary" variant="h6" sx={{ mt: 0 }}>
			{children}
		</Typography>
	</Divider>
)

const About = () => {
	const translate = useTranslate()

	return (
		<MainArea>
			<Typography variant="h4" align="center" sx={{ mt: 4, mb: 5 }}>
				{translate('metadata.title')}
			</Typography>
			<Typography>
				To provide an optimized experience on mobile, tablet, and desktop
				devices, you often need to display different components depending on the
				screen size. MUI provides a hook dedicated to help such responsive
				layouts: useMediaQuery. It expects a function receiving the MUI theme as
				a parameter, and returning a media query. Use the theme breakpoints to
				check for common screen sizes. The hook returns a boolean indicating if
				the current screen matches the media query or not.
			</Typography>
			<Subtitle>{translate('resources.timeline.name')}</Subtitle>
			<Typography>
				To provide an optimized experience on mobile, tablet, and desktop
				devices, you often need to display different components depending on the
				screen size. MUI provides a hook dedicated to help such responsive
				layouts: useMediaQuery. It expects a function receiving the MUI theme as
				a parameter, and returning a media query. Use the theme breakpoints to
				check for common screen sizes. The hook returns a boolean indicating if
				the current screen matches the media query or not.
			</Typography>
			<Subtitle>{translate('resources.create-publication-list.name')}</Subtitle>
			<Typography>
				To provide an optimized experience on mobile, tablet, and desktop
				devices, you often need to display different components depending on the
				screen size. MUI provides a hook dedicated to help such responsive
				layouts: useMediaQuery. It expects a function receiving the MUI theme as
				a parameter, and returning a media query. Use the theme breakpoints to
				check for common screen sizes. The hook returns a boolean indicating if
				the current screen matches the media query or not.
			</Typography>
		</MainArea>
	)
}

export default About
