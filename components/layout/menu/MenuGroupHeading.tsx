import {
	Center,
	StackProps,
	Text,
	Tooltip,
	useBreakpointValue,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

export interface MenuGroupHeadingProps extends StackProps {
	text: string
}

export default function MenuGroupHeading({
	text,
	...props
}: MenuGroupHeadingProps) {
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
			<Center h={12} color="heading" {...props}>
				<Text fontSize="sm" pointerEvents="none">
					{t(text).toUpperCase()}
				</Text>
			</Center>
		</Tooltip>
	)
}
