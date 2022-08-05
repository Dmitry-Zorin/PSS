import { HStack } from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import { Form, FormControl } from 'components'
import { publicationSchema } from 'constants/validation'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export default function PublicationsCreate() {
	const { t } = useTranslation('resources')
	const router = useRouter()
	const { category } = router.query as { category: string }

	function onSubmit(data: Publication) {
		alert(JSON.stringify(data))
	}

	const currentYear = new Date().getFullYear()

	return (
		<Form onSubmit={onSubmit} schema={publicationSchema}>
			<FormControl
				field="title"
				registerOptions={{ required: 'required' }}
				multiline
			/>
			<FormControl field="description" multiline optional />
			<HStack spacing={4}>
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
