import {
	Heading,
	HStack,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from 'components'
import DeleteButton from 'components/buttons/actionButtons/DeleteButton'
import { useEventToast, useMutation } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { Id } from 'validations/common'

interface DeleteModalButtonProps {
	id: Id
	name: string
	resource: string
	subresource?: string
}

export default function DeleteModalButton({
	id,
	name,
	resource,
	subresource,
}: DeleteModalButtonProps) {
	const { t } = useTranslation()
	const router = useRouter()
	const showToast = useEventToast(subresource ?? resource, 'deleted')
	const queryClient = useQueryClient()
	const { isOpen, onOpen, onClose } = useDisclosure()

	const mutation = useMutation(`${resource}/${id}`)

	return (
		<>
			<DeleteButton size="lg" onClick={onOpen} />
			<Modal size="2xl" motionPreset="none" isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Heading as="h1" size="lg">
							{t('messages.delete', {
								this: t(
									`resources:${subresource ?? resource}.name_delete`,
									{},
									{
										fallback: `this ${t(
											`resources:${subresource ?? resource}.name_one`,
										).toLowerCase()}`,
									},
								),
							})}
						</Heading>
					</ModalHeader>
					<ModalBody>
						<Text fontSize="xl">{name}</Text>
					</ModalBody>
					<ModalFooter>
						<HStack spacing={4}>
							<Button onClick={onClose}>{t('actions.cancel')}</Button>
							<Button
								variant="solid"
								colorScheme="red"
								isLoading={mutation.isLoading}
								onClick={async () => {
									try {
										await mutation.mutateAsync({ method: 'delete' })
										showToast('success')
										await queryClient.invalidateQueries([resource])
										await router.replace(
											`/${resource}${subresource ? `/${subresource}` : ''}`,
										)
									} catch (error) {
										showToast('error', { error })
									}
								}}
							>
								{t('actions.delete')}
							</Button>
						</HStack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
