import { Icon as ChakraIcon, IconProps } from '@chakra-ui/react'
import {
	FontAwesomeIcon,
	FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'

export default function Icon(
	props: IconProps & Omit<FontAwesomeIconProps, 'display'>,
) {
	return <ChakraIcon as={FontAwesomeIcon} {...props} />
}
