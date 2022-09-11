import { FormControl, FormLabel } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'
import PublicationFormMenu from './PublicationFormMenu'

export default function PublicationForm() {
	const { t } = useTranslation('resources')

	return (
		<FormControl>
			<FormLabel>{t('fields.publicationForm')}</FormLabel>
			<PublicationFormMenu />
		</FormControl>
	)
}
