import { useQueryClient } from '@tanstack/react-query'
import { Layout, ListButton } from 'components'
import DeleteButton from 'components/buttons/DeleteButton'
import { useEventToast, useMutation, useUrlParams } from 'hooks'
import {
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import prisma from 'server/prisma'
import { findAuthor } from 'server/services/author'
import { DeletePublicationResponse } from 'server/services/publication'
import { isDevelopment } from 'utils/env'
import { getSafeAsync } from 'utils/helpers'
import { idSchema } from 'validations/common'
import AuthorsShow from 'views/authors/AuthorsShow'

export const getStaticPaths: GetStaticPaths = async () => {
	if (isDevelopment) {
		return { paths: [], fallback: 'blocking' }
	}

	const authors = await prisma.author.findMany()

	return {
		paths: authors.flatMap(({ id }) => {
			return ['ru', 'en'].map((locale) => ({
				params: { id: id.toString() },
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
		props: await getSafeAsync(() => findAuthor(id)),
	}
}

export default function AuthorsShowPage({
	error,
	data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const { t } = useTranslation('resources')
	const { id, category } = useUrlParams()
	const router = useRouter()
	const showToast = useEventToast(category, 'deleted')
	const queryClient = useQueryClient()

	const mutation = useMutation<DeletePublicationResponse>(`authors/${id}`)

	return (
		<Layout
			error={error}
			headTitle={id && `${t(`${category}.name`, { count: 1 })} #${id}`}
			title={data && data.fullName}
			leftActions={<ListButton href={`/authors`} />}
			rightActions={
				<DeleteButton
					onClick={async () => {
						await mutation.mutateAsync({ method: 'delete' })
						showToast('success')
						await queryClient.invalidateQueries(['authors'])
						await router.replace(`/authors`)
					}}
					isLoading={mutation.isLoading}
				/>
			}
		>
			<AuthorsShow data={data!} />
		</Layout>
	)
}
