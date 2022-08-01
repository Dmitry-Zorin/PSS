import { Stack } from '@chakra-ui/react'
import { ActionsToolbar, SaveButton } from 'components'
import { Children, cloneElement, ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface FormProps<T> {
	children: ReactElement[]
	onSubmit: SubmitHandler<T>
}

export default function Form<T>({ children, onSubmit }: FormProps<T>) {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<T>()

	return (
		<>
			<Stack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
				{Children.map(children, (e) => {
					return cloneElement(e, { errors, register })
				})}
				<ActionsToolbar
					leftActions={<SaveButton type="submit" isLoading={isSubmitting} />}
				/>
			</Stack>
		</>
	)
}
