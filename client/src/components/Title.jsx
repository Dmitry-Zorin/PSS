import { useResourceContext, useTranslate } from 'react-admin'
import { Helmet } from 'react-helmet'

export const Title = () => {
	const translate = useTranslate()
	const resource = useResourceContext()

	return (
		<Helmet>
			<title>
				{translate(`resources.${resource.split('/').pop()}.name`, {
					smart_count: 2,
				})}
				{' | '}
				{translate(`metadata.title`)}
			</title>
		</Helmet>
	)
}
