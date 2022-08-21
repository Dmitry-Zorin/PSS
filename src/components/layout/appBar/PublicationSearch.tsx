import {
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Kbd,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Icon, IconButton } from 'components'
import { useRedirect } from 'hooks'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

export default function PublicationSearch() {
	const { t } = useTranslation()
	const redirect = useRedirect('/publications/articles')
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [value, setValue] = useState('')

	async function search() {
		if (value) {
			onClose()
			await redirect({ search: value })
		}
	}

	return (
		<>
			<IconButton
				aria-label={t('layout.appBar.search.label')}
				icon={<Icon icon={faSearch} boxSize={5} />}
				onClick={onOpen}
			/>
			<Modal size="xl" motionPreset="none" isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent pb={10}>
					<ModalHeader textAlign="center" pb={6}>
						<Heading as="h1" size="xl">
							{t('layout.appBar.search.title')}
						</Heading>
					</ModalHeader>
					<ModalBody>
						<InputGroup>
							<InputLeftElement h="full" w={14}>
								<Icon icon={faSearch} boxSize={5} color="primary" />
							</InputLeftElement>
							<Input
								h={14}
								bg="bg"
								fontSize="xl"
								fontWeight="semibold"
								pl={14}
								pr={14}
								value={value}
								onChange={(e) => setValue(e.target.value)}
								onKeyDown={(e) => {
									e.key === 'Enter' && search()
								}}
							/>
							<InputRightElement h="full" w={14}>
								<Kbd
									fontSize="md"
									bg="bg"
									borderColor="text-secondary"
									px={2.5}
									pt={0.5}
									pb={1}
								>
									↵
								</Kbd>
							</InputRightElement>
						</InputGroup>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}
