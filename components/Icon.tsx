import { Icon as ChakraIcon, IconProps } from '@chakra-ui/react'
import {
	FontAwesomeIcon,
	FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'

export default function Icon(props: IconProps & FontAwesomeIconProps) {
	return <ChakraIcon as={FontAwesomeIcon} boxSize="1.125rem" {...props} />
}
