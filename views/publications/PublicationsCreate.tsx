import { HStack } from '@chakra-ui/react'
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

	function onSubmit(data: string) {
		mutation.mutate({
			path: 'publications',
			options: {
				method: 'post',
				body: data,
			},
		})
	}

	return (
		<Form onSubmit={onSubmit} schema={publicationSchema}>
			<FormControl field="title" multiline />
			<FormControl field="description" multiline optional />
			<HStack as={FormControlGroup} spacing={4} align="flex-start">
				<FormControl
					field="type"
					placeholder={t(`${category}.name`, { count: 1 })}
					optional
				/>
				<FormControl
					field="year"
					type="number"
					placeholder={currentYear.toString()}
					range={[currentYear, currentYear - 100]}
					optional
				/>

				<FormControl
					field="volume"
					type="number"
					placeholder="1"
					range={[1, 100]}
					optional
				/>
			</HStack>
			<FormControl field="extraData" multiline optional />
		</Form>
	)
}
