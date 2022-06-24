import { Title } from 'components'
import MainArea from 'components/MainArea'
import { truncate } from 'lodash'
import { List, SimpleList, useLocaleState, useTranslate } from 'react-admin'

interface ResourceItem {
	id: string
	createdAt: string
	resource: string
	title: string
	description: string
}

const ListContainer = () => {
	const [locale] = useLocaleState()
	const translate = useTranslate()

	return (
		<>
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
		</>
	)
}

const Timeline = () => (
	<MainArea>
		<List disableAuthentication actions={false}>
			<ListContainer />
		</List>
	</MainArea>
)

export default Timeline
