import { FormControl, FormLabel, Input, List } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { identity } from 'lodash'
import useTranslation from 'next-translate/useTranslation'
import { Dispatch, SetStateAction } from 'react'
import { GetPublicationResponse } from 'server/services/publication'
import { stiffSpringConfig } from 'utils/animation'

interface CoauthorsProps {
	coauthors?: GetPublicationResponse['coauthors']
	setCoauthors: Dispatch<SetStateAction<string[]>>
}

export default function Coauthors({ coauthors, setCoauthors }: CoauthorsProps) {
	const { t } = useTranslation('resources')

	return (
		<FormControl>
			<FormLabel>{t('fields.coauthors')}</FormLabel>
			<List>
				<AnimatePresence>
					{coauthors?.map((name, i) => (
						<motion.li
							key={i}
							initial={i ? { height: 0, opacity: 0 } : false}
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
								placeholder="-"
								onChange={(e) => {
									return setCoauthors((names) => {
										const newNames = [...names]
										newNames[i] = e.target.value
										const newNamesFiltered = newNames.filter(identity)
										if (names.at(-1) === '') {
											newNamesFiltered.push('')
										}
										return newNamesFiltered
									})
								}}
							/>
						</motion.li>
					))}
				</AnimatePresence>
			</List>
		</FormControl>
	)
}
