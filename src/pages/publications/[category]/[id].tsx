import { useToast } from '@chakra-ui/react'
import { Layout, ListButton } from 'components'
import DeleteButton from 'components/buttons/DeleteButton'
import { useRouterQuery } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { trpc } from 'utils/trpc'
import PublicationsShow from 'views/publications/PublicationsShow'

const queryKey = 'publication.one'

export default function PublicationsShowPage() {
	const { t } = useTranslation('resources')
	const { id, category } = useRouterQuery()
	const router = useRouter()
	const toast = useToast()
	const trcpContext = trpc.useContext()

	const { error, data } = trpc.useQuery([queryKey, { id }])

	const mutation = trpc.useMutation(['publication.delete'], {
		async onSuccess() {
			toast({
				title: `${t(`${category}.name`, { count: 1 })} удалена`,
				position: 'top',
				status: 'success',
				duration: 2000,
			})
			await trcpContext.invalidateQueries(['publication.list'])
		},
	})

	return (
		<Layout
			error={error}
			headTitle={id && `${t(`${category}.name`, { count: 1 })} #${id}`}
			title={data?.title}
			leftActions={<ListButton href={`/publications/${category}`} />}
			rightActions={
				<DeleteButton
					onClick={async () => {
						mutation.mutate({ id })
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
