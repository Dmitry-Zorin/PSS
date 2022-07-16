import Head from 'next/head'
import { useTranslation } from 'react-i18next'

export default function HeadTitle({ title }: { title: string }) {
	const { t } = useTranslation('common')

	return (
		<Head>
			<title>{`${title} | ${t('name')}`}</title>
		</Head>
	)
}
