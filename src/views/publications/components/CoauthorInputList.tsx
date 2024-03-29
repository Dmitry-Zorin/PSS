import { Input, List } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useIsFirstRender } from 'hooks'
import { identity } from 'lodash'
import { useController, useFormContext } from 'react-hook-form'
import { GetPublicationResponse } from 'server/services/publication'
import { stiffSpringConfig } from 'utils/animation'

export default function CoauthorInputList() {
	const { control } = useFormContext<Partial<GetPublicationResponse>>()
	const showAnimation = !useIsFirstRender()

	const {
		field: { value: names, onChange: setNames },
	} = useController({
		name: 'coauthors',
		control,
	})

	return (
		<List>
			<AnimatePresence>
				{names?.map((name, i) => (
					<motion.li
						key={i}
						initial={showAnimation ? { height: 0, opacity: 0 } : false}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{
							height: stiffSpringConfig,
							opacity: { duration: 0.1 },
						}}
					>
						<Input
							mb={2}
							value={name}
							placeholder="..."
							onChange={(e) => {
								const newNames = [...names]
								newNames[i] = e.target.value
								const newNamesFiltered = newNames.filter(identity)
								if (names.at(-1) === '') {
									newNamesFiltered.push('')
								}
								setNames(newNamesFiltered)
							}}
						/>
					</motion.li>
				))}
			</AnimatePresence>
		</List>
	)
}
