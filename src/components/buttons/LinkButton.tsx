import { ButtonProps } from '@chakra-ui/react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Button, Icon } from 'components'
import { isString } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import Link, { LinkProps } from 'next/link'

export interface LinkButtonProps extends ButtonProps {
	href?: LinkProps['href']
	icon: IconProp
	action: string
}

export default function LinkButton({
	href,
	icon,
	action,
	...props
}: LinkButtonProps) {
	const { t } = useTranslation()

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
		<Link
			href={href}
			as={isString(href) ? href : href.pathname ?? undefined}
			passHref
		>
			{button}
		</Link>
	) : (
		button
	)
}
