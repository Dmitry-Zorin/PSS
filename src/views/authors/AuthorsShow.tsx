import { Stack } from '@chakra-ui/react'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { useQueryClient } from '@tanstack/react-query'
import { Button, Icon, LabeledText, MainArea } from 'components'
import DeleteButton from 'components/buttons/actionButtons/DeleteButton'
import { saveAs } from 'file-saver'
import { useEventToast, useMutation, useUrlParams } from 'hooks'
import { createDocx } from 'lib/docx'
import { useRouter } from 'next/router'
import { GetAuthorResponse } from 'server/services/author'
import { DeletePublicationResponse } from 'server/services/publication'

interface AuthorsShowProps {
	error: unknown
	data?: GetAuthorResponse
}

export default function AuthorsShow({ error, data }: AuthorsShowProps) {
	// const { t } = useTranslation()
	const { id, category } = useUrlParams()
	const router = useRouter()
	const showToast = useEventToast(category, 'deleted')
	const queryClient = useQueryClient()

	const mutation = useMutation<DeletePublicationResponse>(`authors/${id}`)

	return (
		<MainArea
			error={error}
			title={data && data.fullName}
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
			{data && (
				<>
					<Stack spacing={12} pt={2}>
						{data?.info && <LabeledText label="info" text={data.info} />}
					</Stack>
					<Button
						leftIcon={<Icon icon={faDownload} />}
						onClick={async () => {
							saveAs(await createDocx(data), 'test.docx')
						}}
					>
						Download
					</Button>
				</>
			)}
		</MainArea>
	)
}
