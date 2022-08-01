import { ButtonProps } from '@chakra-ui/react'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { Button, Icon } from 'components'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

interface CreateButtonProps extends ButtonProps {
	href: string
}

export default function CreateButton({ href, ...props }: CreateButtonProps) {
	const { t } = useTranslation('common', { keyPrefix: 'actions' })

	return (
		<Link href={href} passHref>
			<Button as="a" leftIcon={<Icon icon={faAdd} />} {...props}>
				{t('create')}
			</Button>
		</Link>
	)
}
