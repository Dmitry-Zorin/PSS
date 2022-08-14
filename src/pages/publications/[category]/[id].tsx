import { useToast } from '@chakra-ui/react'
import { dehydrate, QueryClient, useQueryClient } from '@tanstack/react-query'
import { Layout, ListButton } from 'components'
import DeleteButton from 'components/buttons/DeleteButton'
import { useMutation, useQuery, useRouterQuery } from 'hooks'
import { HttpError } from 'http-errors'
import { memoize } from 'lodash'
import { GetStaticPaths, GetStaticPropsContext } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import prisma from 'server/prisma'
import {
	DeletePublicationResponse,
	findPublication,
	GetPublicationResponse,
} from 'server/services/publication'
import { isDevelopment } from 'utils/env'
import { publicationIdSchema } from 'validations/publication'
import PublicationsShow from 'views/publications/PublicationsShow'

export const getStaticPaths: GetStaticPaths = memoize(async () => {
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
})

export const getStaticProps = async ({
	params,
}: GetStaticPropsContext<{ id: string; publication?: string }>) => {
	const queryClient = new QueryClient()
	const { id } = publicationIdSchema.parse({ id: params?.id })

	try {
		const data = await findPublication(id)
		queryClient.setQueryData([`publications/${id}`], data)
	} catch (err) {
		if (err instanceof HttpError && err.status === 404) {
			return {
				notFound: true,
			}
		}
	}

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}

export default function PublicationsShowPage() {
	const { t } = useTranslation('resources')
	const { id, category } = useRouterQuery()
	const router = useRouter()
	const toast = useToast()
	const queryClient = useQueryClient()

	const { error, data } = useQuery<GetPublicationResponse>(`publications/${id}`)

	const mutation = useMutation<DeletePublicationResponse>(`publications/${id}`)

	return (
		<Layout
			error={error}
			headTitle={id && `${t(`${category}.name`, { count: 1 })} #${id}`}
			title={data?.title}
			leftActions={<ListButton href={`/publications/${category}`} />}
			rightActions={
				<DeleteButton
					onClick={async () => {
						await mutation.mutateAsync({ method: 'delete' })
						toast({
							title: `${t(`${category}.name`, { count: 1 })} удалена`,
							position: 'top',
							status: 'success',
							duration: 2000,
						})
						await queryClient.invalidateQueries(['publications'])
						await router.replace(`/publications/${category}`)
					}}
					isLoading={mutation.isLoading}
				/>
			}
		>
			{!!data && <PublicationsShow data={data} />}
		</Layout>
	)
}
