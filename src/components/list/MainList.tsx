import { Divider, HStack, List, ListProps, Stack, Text } from '@chakra-ui/react'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { Icon, Pagination, SearchInfo, Tags } from 'components'
import useTranslation from 'next-translate/useTranslation'
import { ComponentProps } from 'react'

export interface MainListProps extends ListProps {
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
			{resource && (
				<>
					<SearchInfo
						resource={resource}
						data={data as ComponentProps<typeof SearchInfo>['data']}
					/>
					<Tags />
				</>
			)}
			{data.total ? (
				<>
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
				<Stack spacing={5} align="center">
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
