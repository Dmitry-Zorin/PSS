import {
	Center,
	StackProps,
	Text,
	Tooltip,
	useBreakpointValue,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

export interface MenuGroupHeaderProps extends StackProps {
	text: string
}

export default function MenuGroupHeader({
	text,
	...props
}: MenuGroupHeaderProps) {
	const { t } = useTranslation('common', { keyPrefix: 'menu.groups' })

	return (
		<Tooltip
			label={t(text)}
			placement="right"
			fontWeight="normal"
			hidden={useBreakpointValue({
				base: false,
				lg: true,
			})}
		>
			<Center h={12} pointerEvents="none" {...props}>
				<Text fontSize="sm" color="text-secondary">
					{t(text).toUpperCase()}
				</Text>
			</Center>
		</Tooltip>
	)
}
