import { Divider, HStack, List, ListProps, Stack, Text } from '@chakra-ui/react'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { Icon, Pagination, Tags } from 'components'
import useTranslation from 'next-translate/useTranslation'

interface MainListProps extends ListProps {
	total: number
}

export default function MainList({ children, total, ...props }: MainListProps) {
	const { t } = useTranslation()

	return (
		<>
			<Tags />
			{total ? (
				<>
					<List
						borderBottom="1px"
						borderColor="border"
						pt={2}
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
					<Pagination total={total} />
				</>
			) : (
				<Stack spacing={4} pt={2} align="center">
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
