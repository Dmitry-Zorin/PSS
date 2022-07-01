import { MainArea, Title } from 'components'
import { truncate } from 'lodash'
import { ListBase, SimpleList, useLocaleState, useTranslate } from 'react-admin'

interface ResourceItem {
	id: string
	createdAt: string
	resource: string
	title: string
	description: string
}

const Timeline = () => {
	const [locale] = useLocaleState()
	const translate = useTranslate()

	return (
		<ListBase disableAuthentication>
			<MainArea>
				<Title />
				<SimpleList
					linkType={(record, id) => {
						return `/${record.resource}/${id}/show`
					}}
					primaryText={(record: ResourceItem) => {
						return translate(`resources.${record.resource}.name`, {
							smart_count: 1,
						})
					}}
					secondaryText={(record) => {
						return truncate(record.title, { length: 200 })
					}}
					tertiaryText={(record) => {
						return new Date(record.createdAt).toLocaleString(locale)
					}}
				/>
			</MainArea>
		</ListBase>
	)
}

export default Timeline
