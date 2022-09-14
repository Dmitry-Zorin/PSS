import { Divider, HStack, List, ListProps, Stack, Text } from '@chakra-ui/react'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { Icon, LabeledField, Pagination, Tags } from 'components'
import { PER_PAGE } from 'constants/app'
import { capitalize } from 'lodash'
import useTranslation from 'next-translate/useTranslation'

interface MainListProps extends ListProps {
	resource?: string
	data: {
		records?: unknown[]
		total?: number
	}
}

export default function MainList({
	children,
	resource,
	data,
	...props
}: MainListProps) {
	const { t } = useTranslation()

	return (
		<>
			{data.total ? (
				<>
					{resource && data.records && (
						<>
							<HStack align="flex-end">
								<LabeledField
									stat
									skipTranslation
									label={capitalize(
										t('messages.foundTotal', {
											items: t(
												`resources:${resource}.name_what_many`,
												{},
												{ fallback: t(`resources:${resource}.name_other`) },
											),
										}),
									)}
									text={data.total}
								/>
								<LabeledField
									stat
									skipTranslation
									label={capitalize(
										t('messages.shownPerPage', {
											items: t(
												`resources:${resource}.name_what_many`,
												{},
												{ fallback: t(`resources:${resource}.name_other`) },
											),
										}),
									)}
									text={Math.min(data.records.length, PER_PAGE)}
								/>
							</HStack>
							<Tags />
						</>
					)}
					<List
						borderBottom="1px"
						borderColor="border"
						sx={{
							'> li': {
								borderTop: '1px',
								borderColor: 'border',
								px: { base: 1, sm: 2 },
								py: 3,
								_hover: { bg: 'bg-layer-1' },
							},
						}}
						{...props}
					>
						{children}
					</List>
					<Pagination total={data.total} />
				</>
			) : (
				<Stack spacing={4} align="center">
					<Divider />
					<HStack color="text-secondary" fontSize="2xl">
						<Icon icon={faBan} boxSize={5} />
						<Text fontWeight="medium">{t('messages.notFound')}</Text>
					</HStack>
				</Stack>
			)}
		</>
	)
}
