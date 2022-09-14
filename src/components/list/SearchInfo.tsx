import { HStack } from '@chakra-ui/react'
import { faFileAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Stat } from 'components'
import { PER_PAGE } from 'constants/app'
import useTranslation from 'next-translate/useTranslation'
import { SetRequired } from 'type-fest'
import { MainListProps } from './MainList'

export default function SearchInfo({
	resource,
	data,
}: SetRequired<MainListProps, 'resource'> & {
	data: Required<MainListProps['data']>
}) {
	const { t } = useTranslation()

	return (
		<HStack align="flex-end">
			<Stat
				label={t('messages.foundTotal', {
					items: t(
						`resources:${resource}.name_what_many`,
						{},
						{ fallback: t(`resources:${resource}.name_other`) },
					),
				})}
				text={data.total}
				icon={faSearch}
			/>
			<Stat
				label={t('messages.shownPerPage', {
					items: t(
						`resources:${resource}.name_what_many`,
						{},
						{ fallback: t(`resources:${resource}.name_other`) },
					),
				})}
				text={Math.min(data.records.length, PER_PAGE)}
				icon={faFileAlt}
			/>
		</HStack>
	)
}
