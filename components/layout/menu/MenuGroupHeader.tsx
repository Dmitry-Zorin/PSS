import { Center, StackProps, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

export interface MenuGroupHeaderProps extends StackProps {
	text: string
}

export default function MenuGroupHeader({
	text,
	...props
}: MenuGroupHeaderProps) {
	const { t } = useTranslation('common', { keyPrefix: 'menu.items' })

	return (
		<Center h={12} pointerEvents="none" {...props}>
			<Text fontSize={{ base: 'sm-', xl: 'sm' }} color="text-secondary">
				{t(text).toUpperCase()}
			</Text>
		</Center>
	)
}
