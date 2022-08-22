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
import { Button, EditButton, Layout } from 'components'
import DeleteButton from 'components/buttons/DeleteButton'
import { useEventToast, useMutation, useUrlParams } from 'hooks'
import {
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import prisma from 'server/prisma'
import {
	DeletePublicationResponse,
	findPublication,
} from 'server/services/publication'
import { isDevelopment } from 'utils/env'
import { getSafeAsync } from 'utils/helpers'
import { idSchema } from 'validations/common'
import PublicationsShow from 'views/publications/PublicationsShow'

export const getStaticPaths: GetStaticPaths = async () => {
	if (isDevelopment) {
		return { paths: [], fallback: 'blocking' }
	}

	const publications = await prisma.publication.findMany()

	return {
		paths: publications.flatMap(({ id, category }) => {
			return ['ru', 'en'].map((locale) => ({
				params: {
					category,
					id: id.toString(),
				},
				locale,
			}))
		}),
		fallback: 'blocking',
	}
}

export const getStaticProps = async ({
	params,
}: GetStaticPropsContext<{ id: string; publication?: string }>) => {
	const { id } = idSchema.parse({ id: params?.id })
	return {
		props: await getSafeAsync(() => findPublication(id)),
	}
}

export default function PublicationsShowPage({
	error,
	data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const { t } = useTranslation('resources')
	const { id, category } = useUrlParams()
	const router = useRouter()
	const showToast = useEventToast(category, 'deleted')
	const queryClient = useQueryClient()
	const { isOpen, onOpen, onClose } = useDisclosure()

	const mutation = useMutation<DeletePublicationResponse>(`publications/${id}`)

	return (
		<Layout
			error={error}
			headTitle={id && `${t(`${category}.name`, { count: 1 })} #${id}`}
			title={data?.title}
			rightActions={
				data && (
					<>
						<EditButton
							href={{
								pathname: `/publications/${category}/create`,
								query: JSON.stringify(data),
							}}
						/>
						<DeleteButton onClick={onOpen} isLoading={mutation.isLoading} />
						<Modal
							size="2xl"
							motionPreset="none"
							isOpen={isOpen}
							onClose={onClose}
						>
							<ModalOverlay />
							<ModalContent>
								<ModalHeader>
									<Heading as="h1" size="lg">
										{t('messages.delete')}
									</Heading>
								</ModalHeader>
								<ModalBody>
									<Text fontSize="xl">{data.title}</Text>
								</ModalBody>
								<ModalFooter>
									<HStack spacing={4}>
										<Button onClick={onClose}>
											{t('common:actions.cancel')}
										</Button>
										<Button
											variant="solid"
											colorScheme="red"
											onClick={async () => {
												await mutation.mutateAsync({ method: 'delete' })
												showToast('success')
												await queryClient.invalidateQueries(['publications'])
												await router.replace(`/publications/${category}`)
											}}
										>
											{t('common:actions.delete')}
										</Button>
									</HStack>
								</ModalFooter>
							</ModalContent>
						</Modal>
					</>
				)
			}
		>
			<PublicationsShow data={data!} />
		</Layout>
	)
}
