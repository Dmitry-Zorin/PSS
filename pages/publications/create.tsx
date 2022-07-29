import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
} from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { HeadTitle, Layout } from 'components'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useForm, UseFormRegister } from 'react-hook-form'
import { FieldErrors } from 'react-hook-form/dist/types/errors'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'fields',
	])

	const queryClient = new QueryClient()

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

const PublicationCreatePage: NextPage = () => {
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
				<Stack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
					<MyFormControl field="title" {...formControlProps} />
					<MyFormControl field="description" {...formControlProps} />
					<Button
						type="submit"
						variant="solid"
						colorScheme="primary"
						isLoading={isSubmitting}
						mt={4}
					>
						Submit
					</Button>
				</Stack>
			</Layout>
		</>
	)
}

export default PublicationCreatePage
