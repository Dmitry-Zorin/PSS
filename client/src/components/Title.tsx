import { useResourceContext, useTranslate } from 'react-admin'
import { Helmet } from 'react-helmet'

const Title = () => {
	const translate = useTranslate()
	const resource = useResourceContext()

	return (
		<Helmet>
			<title>
				{translate(`resources.${resource}.name`, {
					smart_count: 2,
				})}
				{' | '}
				{translate(`metadata.title`)}
			</title>
		</Helmet>
	)
}

export default Title
