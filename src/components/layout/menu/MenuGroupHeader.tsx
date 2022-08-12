import { Center, StackProps, Text } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'

export interface MenuGroupHeaderProps extends StackProps {
	text: string
}

export default function MenuGroupHeader({
	text,
	...props
}: MenuGroupHeaderProps) {
	const { t } = useTranslation()

	return (
		<Center h={12} pointerEvents="none" {...props}>
			<Text fontSize={{ base: 'sm-', xl: 'sm' }} color="text-secondary">
				{t(`menu.items.${text}`).toUpperCase()}
			</Text>
		</Center>
	)
}
