import { DeleteModalButton, EditButton, Layout } from 'components'
import { useUrlParams } from 'hooks'
import {
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next'
import useTranslation from 'next-translate/useTranslation'
import prisma from 'server/prisma'
import { findPublication } from 'server/services/publication'
import { isDevelopment } from 'utils/env'
import { getSafeAsync } from 'utils/helpers'
import { idSchema } from 'validations/common'
import PublicationsShow from 'views/publications/PublicationsShow'

export const getStaticPaths: GetStaticPaths = async () => {
	if (isDevelopment) {
		return { paths: [], fallback: 'blocking' }
	}

	const publications = await prisma.publication.findMany()

	return {
		paths: publications.flatMap(({ id, category }) => {
			return ['ru', 'en'].map((locale) => ({
				params: {
					category,
					id: id.toString(),
				},
				locale,
			}))
		}),
		fallback: 'blocking',
	}
}

export const getStaticProps = async ({
	params,
}: GetStaticPropsContext<{ id: string; publication?: string }>) => {
	const { id } = idSchema.parse({ id: params?.id })
	return {
		props: await getSafeAsync(() => findPublication(id)),
	}
}

export default function PublicationsShowPage({
	error,
	data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const { t } = useTranslation('resources')
	const { id, category } = useUrlParams()

	return (
		<Layout
			error={error}
			headTitle={id && `${t(`${category}.name`, { count: 1 })} #${id}`}
			title={data?.title}
			rightActions={
				data && (
					<>
						<EditButton
							href={{
								pathname: `/publications/${category}/create`,
								query: JSON.stringify(data),
							}}
						/>
						<DeleteModalButton
							id={data.id}
							name={data.title}
							resource="publications"
							subresource={category}
						/>
					</>
				)
			}
		>
			<PublicationsShow data={data!} />
		</Layout>
	)
}
