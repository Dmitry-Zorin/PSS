import { Box, Button, ButtonProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export interface CoolButtonLinkProps extends ButtonProps {
	to: string
}

export default function CoolButtonLink({ to, ...props }: CoolButtonLinkProps) {
	return (
		<Link href={to}>
			<Box
				as={motion.div}
				display="inline-block"
				borderRadius="full"
				whileHover={{
					scale: 1.05,
					transition: {
						type: 'spring',
						stiffness: 300,
						damping: 30,
					},
				}}
			>
				<Button
					fontSize="lg"
					fontWeight={500}
					px={9}
					py={7}
					color="white"
					rounded="full"
					bgGradient="linear(50deg, blue.500, purple.400)"
					_hover={{}}
					_active={{}}
					{...props}
				/>
			</Box>
		</Link>
	)
}
