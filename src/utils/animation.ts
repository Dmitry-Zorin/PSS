import { Transition } from 'framer-motion'

export const gentleSpringConfig: Transition = {
	type: 'spring',
	stiffness: 120,
	damping: 14,
	mass: 0.45,
}

export const stiffSpringConfig: Transition = {
	type: 'spring',
	stiffness: 180,
	damping: 14,
	mass: 0.4,
}

export function getSpringAnimation(open: boolean) {
	return open ? gentleSpringConfig : stiffSpringConfig
}
