import { Layout } from 'components'
import {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
	NextPage,
} from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { findPublications } from 'server/services/publication'
import { publicationFiltersSchema } from 'validations/publication'
import TimelineView from 'views/timeline/Timeline'

const queryParams = {
	sortField: 'createdAt',
	sortOrder: 'desc',
} as const

export const getServerSideProps = async ({
	locale,
	params,
	res,
}: GetServerSidePropsContext) => {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'resources',
	])
	res.setHeader(
		'Cache-Control',
		`s-maxage=1, stale-while-revalidate=${30 * 24 * 60 * 60}`,
	)
	try {
		const data = await findPublications(
			publicationFiltersSchema.parse(params || queryParams),
		)
		return {
			props: {
				data,
				error: undefined,
				...translationProps,
			},
		}
	} catch (e) {
		return {
			props: {
				data: undefined,
				error: e,
				...translationProps,
			},
		}
	}
}

const TimelinePage: NextPage<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ error, data }) => {
	const { t } = useTranslation('common', { keyPrefix: 'menu.items' })

	return (
		<Layout title={t('timeline')} error={error as any}>
			{data && <TimelineView data={data as any} />}
		</Layout>
	)
}

export default TimelinePage
