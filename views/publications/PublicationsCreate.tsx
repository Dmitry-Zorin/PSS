import { Stack } from '@chakra-ui/react'
import { Form, FormControl, FormControlGroup } from 'components'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { trpc } from 'utils/trpc'
import {
	CreatePublicationDto,
	publicationSchema,
} from 'validations/publication'

const currentYear = new Date().getFullYear()

export default function PublicationsCreate() {
	const { t } = useTranslation('resources')
	const router = useRouter()
	const { category } = router.query as { category: string }

	const addPublication = trpc.useMutation(['publication.add'])

	function onSubmit(data: CreatePublicationDto) {
		addPublication.mutateAsync({
			...data,
			category,
		})
	}

	return (
		<Form onSubmit={onSubmit} schema={publicationSchema}>
			<FormControl field="title" multiline />
			<FormControl field="description" multiline optional />
			<Stack
				as={FormControlGroup}
				direction={{ base: 'column', md: 'row' }}
				spacing={4}
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
