import { Layout } from 'components'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { trpc } from 'utils/trpc'
import TimelineView from 'views/timeline/Timeline'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
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

	const { error, data } = trpc.useQuery([
		'publication.list',
		{ sortField: 'createdAt', sortOrder: 'desc' },
	])

	return (
		<Layout title={t('timeline')} error={error}>
			<TimelineView data={data} />
		</Layout>
	)
}

export default TimelinePage
