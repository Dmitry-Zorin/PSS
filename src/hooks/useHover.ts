import { useDisclosure } from '@chakra-ui/react'
import { useRef } from 'react'

export default function useHover(delay = 0) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const timeout = useRef<NodeJS.Timeout>()
	return {
		isHovered: isOpen,
		listeners: {
			onMouseEnter: () => {
				clearTimeout(timeout.current)
				onOpen()
			},
			onMouseLeave: () => {
				timeout.current = setTimeout(onClose, delay)
			},
		},
	}
}
