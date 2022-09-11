import { HStack, Stack, StackProps } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SaveButton } from 'components'
import { usePersistedForm } from 'hooks'
import { forEach, isEmpty } from 'lodash'
import { ReactElement, ReactNode, useCallback } from 'react'
import {
	FormProvider,
	Path,
	SubmitHandler,
	useForm,
	UseFormProps,
} from 'react-hook-form'
import useFormPersist, { FormPersistConfig } from 'react-hook-form-persist'
import { isDevelopment } from 'utils/env'
import { z } from 'zod'

interface FormProps<T extends z.ZodType> extends StackProps {
	children: ReactElement[]
	onSubmit: SubmitHandler<z.infer<T>>
	schema: T
	useFormProps?: UseFormProps<z.infer<T>>
	actions?: ReactNode
	persistConfig?: Partial<FormPersistConfig>
}

export default function Form<T extends z.ZodType>({
	children,
	onSubmit,
	schema,
	useFormProps,
	actions,
	persistConfig,
	...props
}: FormProps<T>) {
	const { formKey, formState } = usePersistedForm<z.infer<T>>()

	const formMethods = useForm<z.infer<T>>({
		resolver: zodResolver(schema),
		...useFormProps,
	})

	const {
		handleSubmit,
		getValues,
		setValue,
		watch,
		formState: { isSubmitting, errors },
	} = formMethods

	useFormPersist(formKey, {
		watch,
		setValue,
		onDataRestored: useCallback(() => {
			forEach(formState ?? {}, (value, key) => {
				setValue(key as Path<z.infer<T>>, value)
			})
		}, [formState, setValue]),
		...persistConfig,
	})

	if (!isEmpty(errors) && isDevelopment) {
		console.error(errors)
		console.log(getValues())
	}

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
					<SaveButton size="lg" isLoading={isSubmitting} />
				</HStack>
			</Stack>
		</FormProvider>
	)
}
