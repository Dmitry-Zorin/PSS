import { useQuery } from '@tanstack/react-query'
import { Layout } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetPublicationsResponse } from 'types'
import TimelineView from 'views/timeline/Timeline'

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'resources',
	])
	return {
		props: translationProps,
	}
}

const TimelinePage: NextPage = () => {
	const { t } = useTranslation('common', { keyPrefix: 'menu.items' })

	const { error, data } = useQuery<GetPublicationsResponse, Error>([
		'publications',
		{ sort: { createdAt: 'desc' } },
	])

	return (
		<Layout title={t('timeline')} error={error}>
			<TimelineView data={data} />
		</Layout>
	)
}

export default TimelinePage
