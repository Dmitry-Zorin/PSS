import { Stack } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import {
	AuthorSelect,
	Coauthors,
	FileUpload,
	Form,
	FormControl,
	FormControlGroup,
	MainArea,
} from 'components'
import { useEventToast, useMutation, useUrlParams } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
	CreatePublicationResponse,
	GetPublicationResponse,
	UpdatePublicationResponse,
} from 'server/services/publication'
import { Id } from 'validations/common'
import {
	createPublicationSchema,
	publicationSchema,
} from 'validations/publication'
import { z } from 'zod'

const currentYear = new Date().getFullYear()

export default function PublicationsCreate() {
	const { t } = useTranslation('resources')
	const queryClient = useQueryClient()
	const router = useRouter()

	const { category, data: dataString } = useUrlParams()
	const rawData = dataString
		? (JSON.parse(dataString) as GetPublicationResponse)
		: undefined
	const data = rawData
		? createPublicationSchema
				.strip()
				.omit({
					category: true,
					authorIds: true,
				})
				.partial()
				.parse(rawData)
		: undefined

	const showToast = useEventToast(category, dataString ? 'updated' : 'created')
	const mutation = useMutation<
		typeof dataString extends string
			? UpdatePublicationResponse
			: CreatePublicationResponse
	>(`publications${rawData ? `/${rawData.id}` : ''}`)
	const [authorIds, setAuthorIds] = useState<Id[]>(
		rawData?.authors.map((e) => e.id) ?? [],
	)
	const [coauthors, setCoauthors] = useState<string[]>(
		rawData?.coauthors ?? [''],
	)

	async function onSubmit(data: z.infer<typeof publicationSchema>) {
		console.log('data', data)
		const { id } = await mutation.mutateAsync({
			method: rawData ? 'put' : 'post',
			body: {
				...data,
				authorIds,
				coauthors,
				...(!rawData && {
					category,
					type: data.type || t(`${category}.name`, { count: 1 }),
				}),
			},
		})
		showToast('success')
		await queryClient.invalidateQueries(['publications'])
		await router.push(`/publications/${category}/${id}`)
	}

	return (
		<MainArea
			title={`${t('common:actions.create')} ${t(`${category}.name_what`, null, {
				fallback: t(`${category}.name_one`),
			})}`}
		>
			<Form onSubmit={onSubmit} schema={publicationSchema} defaultValues={data}>
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
						optional
					/>
					<FormControl
						field="volumeInPages"
						type="number"
						placeholder="1"
						optional
					/>
				</Stack>
				<AuthorSelect authors={rawData?.authors} setAuthorIds={setAuthorIds} />
				<Coauthors {...{ coauthors, setCoauthors }} />
				<FormControl field="extraData" multiline optional />
				<FileUpload />
			</Form>
		</MainArea>
	)
}
