import { Stack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ActionsToolbar, SubmitButton } from 'components'
import { Children, cloneElement, ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface FormProps {
	children: ReactElement[]
	onSubmit: SubmitHandler<any>
	schema: any
}

export default function Form({ children, onSubmit, schema }: FormProps) {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: zodResolver(schema) })

	return (
		<>
			<Stack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
				{Children.map(children, (e) => {
					return cloneElement(e, { errors, register })
				})}
				<ActionsToolbar
					leftActions={<SubmitButton isLoading={isSubmitting} />}
				/>
			</Stack>
		</>
	)
}
