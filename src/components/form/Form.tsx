import { HStack, Stack, StackProps } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SaveButton, SubmitButton } from 'components'
import { ReactElement, ReactNode } from 'react'
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
	actions?: ReactNode
}

export default function Form<T extends ZodType>({
	children,
	onSubmit,
	schema,
	defaultValues,
	useFormProps,
	actions,
	...props
}: FormProps<T>) {
	const formMethods = useForm({
		resolver: zodResolver(schema),
		defaultValues,
		...useFormProps,
	})

	const {
		handleSubmit,
		formState: { isSubmitting, errors },
	} = formMethods

	if (errors) {
		console.log(errors)
	}

	const Button = defaultValues ? SaveButton : SubmitButton

	return (
		<FormProvider {...formMethods}>
			<Stack as="form" spacing={6} onSubmit={handleSubmit(onSubmit)} {...props}>
				{children}
				<HStack spacing={4} justify="space-evenly" pt={6}>
					{actions}
					<Button size="lg" isLoading={isSubmitting} />
				</HStack>
			</Stack>
		</FormProvider>
	)
}
