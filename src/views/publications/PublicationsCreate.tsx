import { Stack, Text, useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Form, FormControl, FormControlGroup } from 'components'
import { useMutation } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { CreatePublicationResponse } from 'server/services/publication'
import { CreatePublication, publicationSchema } from 'validations/publication'

const currentYear = new Date().getFullYear()

export default function PublicationsCreate() {
	const { t } = useTranslation('resources')
	const router = useRouter()
	const toast = useToast()
	const { category } = router.query as { category: string }
	const queryClient = useQueryClient()

	const mutation = useMutation<CreatePublicationResponse>('publications')

	async function onSubmit(data: CreatePublication) {
		const { id } = await mutation.mutateAsync({
			method: 'post',
			body: { ...data, category },
		})
		toast({
			position: 'top',
			status: 'success',
			duration: 2000,
			render: () => (
				<Stack bg="green.500" borderRadius="lg" p={6}>
					<Text color="white">{`${t(`${category}.name`, {
						count: 1,
					})} создана`}</Text>
				</Stack>
			),
		})
		await queryClient.invalidateQueries(['publications'])
		await router.push(`/publications/${category}/${id}`)
	}

	return (
		<Form onSubmit={onSubmit} schema={publicationSchema}>
			<FormControl field="title" multiline />
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
			<FormControl field="extraData" multiline optional />
		</Form>
	)
}
