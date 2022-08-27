import { Center, Stack, StackProps } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SaveButton, SubmitButton } from 'components'
import { ReactElement } from 'react'
import {
	FormProvider,
	SubmitHandler,
	useForm,
	UseFormProps,
} from 'react-hook-form'
import { z, ZodType } from 'zod'

interface FormProps<T extends ZodType> extends StackProps {
	children: ReactElement[]
	onSubmit: SubmitHandler<z.infer<T>>
	schema: T
	defaultValues: UseFormProps['defaultValues']
	useFormProps?: UseFormProps
}

export default function Form<T extends ZodType>({
	children,
	onSubmit,
	schema,
	defaultValues,
	useFormProps,
	...props
}: FormProps<T>) {
	const formMethods = useForm({
		resolver: zodResolver(schema),
		defaultValues,
		...useFormProps,
	})

	const {
		handleSubmit,
		formState: { isSubmitting },
	} = formMethods

	const Button = defaultValues ? SaveButton : SubmitButton

	return (
		<FormProvider {...formMethods}>
			<Stack as="form" spacing={6} onSubmit={handleSubmit(onSubmit)} {...props}>
				{children}
				<Center pt={6}>
					<Button size="lg" isLoading={isSubmitting} />
				</Center>
			</Stack>
		</FormProvider>
	)
}
