import { Stack } from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import { ActionsToolbar, FormControl, SaveButton } from 'components'
import { useForm } from 'react-hook-form'

export default function PublicationsCreateView() {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<Publication>()

	const formControlProps = { errors, register }

	function onSubmit() {}

	return (
		<>
			<Stack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
				<FormControl field="title" {...formControlProps} />
				<FormControl field="description" {...formControlProps} />
			</Stack>
			<ActionsToolbar
				leftActions={
					<SaveButton type="submit" isLoading={isSubmitting} mt={4} />
				}
			/>
		</>
	)
}
