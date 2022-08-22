import { Stack } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import {
	AuthorSelect,
	FileUpload,
	Form,
	FormControl,
	FormControlGroup,
} from 'components'
import { useEventToast, useMutation, useUrlParams } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CreatePublicationResponse } from 'server/services/publication'
import { Id } from 'validations/common'
import { CreatePublication, publicationSchema } from 'validations/publication'

const currentYear = new Date().getFullYear()

export default function PublicationsCreate() {
	const { t } = useTranslation('resources')
	const router = useRouter()
	const { category } = useUrlParams()
	const mutation = useMutation<CreatePublicationResponse>('publications')
	const showToast = useEventToast(category, 'created')
	const queryClient = useQueryClient()
	const [authorIds, setAuthorIds] = useState<Id[]>([])

	console.log(useUrlParams())

	async function onSubmit(data: CreatePublication) {
		const { id } = await mutation.mutateAsync({
			method: 'post',
			body: {
				...data,
				category,
				type: data.type || t(`${category}.name`, { count: 1 }),
				authorIds,
			},
		})
		showToast('success')
		await queryClient.invalidateQueries(['publications'])
		await router.push(`/publications/${category}/${id}`)
	}

	return (
		<Form onSubmit={onSubmit} schema={publicationSchema}>
			<FormControl field="title" multiline minH={10} />
			<FormControl field="description" multiline optional />
			<Stack
				as={FormControlGroup}
				direction={{ base: 'column', md: 'row' }}
				spacing={6}
				align="flex-start"
			>
				<FormControl
					field="type"
					placeholder={t(`${category}.name`, { count: 1 })}
					optional
				/>
				<FormControl
					field="writtenInYear"
					type="number"
					placeholder={currentYear.toString()}
					range={[currentYear, currentYear - 100]}
					optional
				/>
				<FormControl
					field="volumeInPages"
					type="number"
					placeholder="1"
					range={[1, 100]}
					optional
				/>
			</Stack>
			<AuthorSelect setAuthorIds={setAuthorIds} />
			<FormControl field="extraData" multiline optional />
			<FileUpload />
		</Form>
	)
}
