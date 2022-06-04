import { useResourceContext, useTranslate } from 'react-admin'

export const Title = ({ action }) => {
	const resource = useResourceContext()
	const translate = useTranslate()

	const resourceName = translate(`resources.${resource}.name`, {
		smart_count: 2,
	})

	const actionName = translate(`ra.action.${action}`)

	return <span>{`${resourceName}: ${actionName}`}</span>
}
