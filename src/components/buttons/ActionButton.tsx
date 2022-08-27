import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Button, Icon } from 'components'
import useTranslation from 'next-translate/useTranslation'
import { ButtonProps } from './Button'

export interface ActionButtonProps extends ButtonProps {
	icon: IconProp
	action: string
}

export default function ActionButton({
	icon,
	action,
	...props
}: ActionButtonProps) {
	const { t } = useTranslation()

	return (
		<Button leftIcon={<Icon icon={icon} />} {...props}>
			{t(`actions.${action}`)}
		</Button>
	)
}
