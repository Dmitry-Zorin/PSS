import { ButtonProps } from '@chakra-ui/react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Button, Icon } from 'components'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

export interface LinkButtonProps extends ButtonProps {
	href?: string
	icon: IconProp
	action: string
}

export default function CreateButton({
	href,
	icon,
	action,
	...props
}: LinkButtonProps) {
	const { t } = useTranslation('common')

	const button = (
		<Button
			as={href ? 'a' : 'button'}
			leftIcon={<Icon icon={icon} />}
			{...props}
		>
			{t(`actions.${action}`)}
		</Button>
	)

	return href ? (
		<Link href={href} passHref>
			{button}
		</Link>
	) : (
		button
	)
}
