import { Center, Stack, StackProps } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitButton } from 'components'
import { ReactElement } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

interface FormProps extends StackProps {
	children: ReactElement[]
	onSubmit: SubmitHandler<any>
	schema: any
}

export default function Form({
	children,
	onSubmit,
	schema,
	...props
}: FormProps) {
	const formMethods = useForm({ resolver: zodResolver(schema) })
	const {
		handleSubmit,
		formState: { isSubmitting },
	} = formMethods

	return (
		<FormProvider {...formMethods}>
			<Stack as="form" spacing={6} onSubmit={handleSubmit(onSubmit)} {...props}>
				{children}
				<Center pt={6}>
					<SubmitButton size="lg" isLoading={isSubmitting} />
				</Center>
			</Stack>
		</FormProvider>
	)
}
