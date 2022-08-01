import { ButtonProps } from '@chakra-ui/react'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { Button, Icon } from 'components'
import { useTranslation } from 'next-i18next'

export default function SaveButton(props: ButtonProps) {
	const { t } = useTranslation('common', { keyPrefix: 'actions' })

	return (
		<Button variant="solid" leftIcon={<Icon icon={faSave} />} {...props}>
			{t('save')}
		</Button>
	)
}
