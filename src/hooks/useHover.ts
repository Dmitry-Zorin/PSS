import { useDisclosure } from '@chakra-ui/react'

export default function useHover() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return {
		isHovered: isOpen,
		listeners: {
			onMouseEnter: onOpen,
			onMouseLeave: onClose,
		},
	}
}
