import { HStack, Stack, StackProps } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SaveButton, SubmitButton } from 'components'
import { isEmpty } from 'lodash'
import { ReactElement, ReactNode } from 'react'
import {
	FormProvider,
	SubmitHandler,
	useForm,
	UseFormProps,
} from 'react-hook-form'
import { isDevelopment } from 'utils/env'
import { z } from 'zod'

interface FormProps<T extends z.ZodType> extends StackProps {
	children: ReactElement[]
	onSubmit: SubmitHandler<z.infer<T>>
	schema: T
	defaultValues: UseFormProps['defaultValues']
	useFormProps?: UseFormProps
	actions?: ReactNode
}

export default function Form<T extends z.ZodType>({
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
		getValues,
		formState: { isSubmitting, errors },
	} = formMethods

	if (!isEmpty(errors) && isDevelopment) {
		console.error(errors)
		console.log(getValues())
	}

	const Button = defaultValues ? SaveButton : SubmitButton

	return (
		<FormProvider {...formMethods}>
			<Stack as="form" spacing={6} onSubmit={handleSubmit(onSubmit)} {...props}>
				{children}
				<HStack
					spacing={4}
					justify={actions ? 'space-between' : 'center'}
					pt={6}
				>
					{actions}
					<Button size="lg" isLoading={isSubmitting} />
				</HStack>
			</Stack>
		</FormProvider>
	)
}
