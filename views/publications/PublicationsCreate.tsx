import { Stack } from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { Form, FormControl, FormControlGroup } from 'components'
import { publicationSchema } from 'constants/validation'
import { MutationVariables } from 'lib/common/queryClientConfig'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const currentYear = new Date().getFullYear()

export default function PublicationsCreate() {
	const { t } = useTranslation('resources')
	const router = useRouter()
	const { category } = router.query as { category: string }

	const mutation = useMutation<unknown, unknown, MutationVariables>({})

	function onSubmit(data: Publication) {
		mutation.mutate({
			path: 'publications',
			options: {
				method: 'post',
				body: {
					...data,
					category,
				},
			},
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
