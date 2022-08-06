import { Box, BoxProps } from '@chakra-ui/react'
import { Children, cloneElement, ReactElement } from 'react'

interface FormControlGroupProps extends BoxProps {
	children: ReactElement[]
	register?: unknown
	errors?: unknown
}

export default function FormControlGroup({
	children,
	register,
	errors,
	...props
}: FormControlGroupProps) {
	return (
		<Box {...props}>
			{Children.map(children, (e) => {
				return cloneElement(e, { register, errors })
			})}
		</Box>
	)
}
