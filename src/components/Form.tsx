import { Center, Stack, StackProps } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitButton } from 'components'
import { Children, cloneElement, ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

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
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(schema) })

	return (
		<Stack as="form" spacing={6} onSubmit={handleSubmit(onSubmit)} {...props}>
			{Children.map(children, (e) => {
				return cloneElement(e, { errors, register })
			})}
			<Center pt={6}>
				<SubmitButton size="lg" isLoading={isSubmitting} />
			</Center>
		</Stack>
	)
}
