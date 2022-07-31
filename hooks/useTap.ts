import { useDisclosure } from '@chakra-ui/react'

export default function useTap() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return {
		isTapped: isOpen,
		listeners: {
			onMouseDown: onOpen,
			onMouseUp: onClose,
			onMouseLeave: onClose,
		},
	}
}
