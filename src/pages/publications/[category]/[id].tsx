import { useToast } from '@chakra-ui/react'
import { dehydrate, QueryClient, useQueryClient } from '@tanstack/react-query'
import { Layout, ListButton } from 'components'
import DeleteButton from 'components/buttons/DeleteButton'
import { useMutation, useQuery, useRouterQuery } from 'hooks'
import { HttpError } from 'http-errors'
import { GetServerSidePropsContext } from 'next'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import {
	DeletePublicationResponse,
	findPublication,
	GetPublicationResponse,
} from 'server/services/publication'
import { publicationIdSchema } from 'validations/publication'
import PublicationsShow from 'views/publications/PublicationsShow'

export const getServerSideProps = async ({
	res,
	params,
}: GetServerSidePropsContext<{ id: string }>) => {
	const queryClient = new QueryClient()
	const { id } = publicationIdSchema.parse({ id: params?.id })

	try {
		const data = await findPublication(id)
		queryClient.setQueryData([`publications/${id}`], data)
		res.setHeader(
			'Cache-Control',
			`s-maxage=1, stale-while-revalidate=${30 * 24 * 60 * 60}`,
		)
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
