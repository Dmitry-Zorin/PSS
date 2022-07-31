import { Button, ButtonProps } from '@chakra-ui/react'
import { faAdd, faTableList } from '@fortawesome/free-solid-svg-icons'
import { Icon } from 'components'
import { useTranslation } from 'next-i18next'

export default function CreateButton(props: ButtonProps) {
	const { t } = useTranslation('common', { keyPrefix: 'actions' })

	return (
		<Button leftIcon={<Icon icon={faTableList} />} {...props}>
			{t('list')}
		</Button>
	)
}
