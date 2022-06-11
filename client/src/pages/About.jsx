import { Card, Divider, Typography } from '@mui/material'
import { useTranslate } from 'react-admin'

const Subtitle = ({ children }) => (
	<Divider sx={{ mt: 5, mb: 2, mx: 3 }}>
		<Typography color="primary" variant="h5" sx={{ mt: 0, fontWeight: 600 }}>
			{children}
		</Typography>
	</Divider>
)

export const About = () => {
	const translate = useTranslate()

	return (
		<Card className="layout-container" sx={{ height: '100%' }}>
			<Typography
				sx={{
					textAlign: 'center',
					fontSize: '2.3em',
					fontWeight: 700,
					mt: 4,
					mb: 3,
				}}
			>
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
		</Card>
	)
}
