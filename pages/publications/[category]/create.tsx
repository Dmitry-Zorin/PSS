import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Heading,
} from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { HeadTitle, Layout } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { queryClientConfig } from 'pages/_app'
import { useForm } from 'react-hook-form'
import { FieldErrors } from '../../../node_modules/react-hook-form/dist/types/errors'
import { UseFormRegister } from '../../../node_modules/react-hook-form/dist/types/form.d.ts'

export const getServerSideProps: GetServerSideProps = async ({
	params,
	locale,
}) => {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'fields',
	])

	const queryClient = new QueryClient(queryClientConfig)

	return {
		props: {
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			...translationProps,
		},
	}
}

interface MyFormControlProps<T> {
	field: string & keyof T
	errors: FieldErrors<T>
	register: UseFormRegister<T>
}

function MyFormControl<T>({ field, errors, register }: MyFormControlProps<T>) {
	const { t } = useTranslation('fields')
	return (
		<FormControl isInvalid={!!errors[field]}>
			<FormLabel htmlFor={field}>{t(field)}</FormLabel>
			<Input
				id={field}
				placeholder={field}
				{...register(field, {
					required: 'This is required',
					minLength: { value: 4, message: 'Minimum length should be 4' },
				})}
			/>
			<FormErrorMessage>{errors[field]?.message}</FormErrorMessage>
		</FormControl>
	)
}

const PublicationPage: NextPage = () => {
	const { t } = useTranslation('common')
	const router = useRouter()

	const { category } = router.query as {
		category: string
	}

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<Publication>()

	const formControlProps = { errors, register }

	function onSubmit() {}

	return (
		<>
			<HeadTitle title={`Create ${t(category)}`} />
			<Layout title="Create article">
				<Heading as="h2" size="lg">
					Create article
				</Heading>
				<form onSubmit={handleSubmit(onSubmit)}>
					<MyFormControl field="title" {...formControlProps} />
					<MyFormControl field="description" {...formControlProps} />
					<Button
						mt={4}
						colorScheme="teal"
						isLoading={isSubmitting}
						type="submit"
					>
						Submit
					</Button>
				</form>
			</Layout>
		</>
	)
}

export default PublicationPage
