import { Stack, Text, useToast } from '@chakra-ui/react'
import { Form, FormControl, FormControlGroup } from 'components'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { trpc } from 'utils/trpc'
import { CreatePublication, publicationSchema } from 'validations/publication'

const currentYear = new Date().getFullYear()

export default function PublicationsCreate() {
	const { t } = useTranslation('resources')
	const router = useRouter()
	const trcpContext = trpc.useContext()
	const toast = useToast()
	const { category } = router.query as { category: string }

	const addPublication = trpc.useMutation(['publication.create'])

	async function onSubmit(data: CreatePublication) {
		const { id } = await addPublication.mutateAsync({
			...data,
			category,
		})
		toast({
			position: 'top',
			status: 'success',
			duration: 5000,
			render: () => (
				<Stack bg="green.500" borderRadius="lg" p={6}>
					<Text color="white">{`${t(`${category}.name`, {
						count: 1,
					})} создана`}</Text>
					{/* <div>
						<LinkButton
							href={`/publications/${category}/${id}`}
							icon={faEye}
							action={t('View', { ns: 'common' })}
						/>
					</div> */}
				</Stack>
			),
		})
		await router.push(`/publications/${category}/${id}`)
		await trcpContext.invalidateQueries(['publication.list'])
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
