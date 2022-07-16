import { InfoIcon } from '@chakra-ui/icons'
import { List } from '@chakra-ui/react'
import { MenuItem } from 'layout'
import { useTranslation } from 'next-i18next'

const resources = {
	timeline: true,
	authors: true,
	publications: {
		articles: true,
		abstracts: true,
		dissertations: true,
		monographs: true,
		patents: true,
		reports: true,
		programs: true,
		textbooks: true,
	},
	admin: {
		characters: true,
	},
}

export default function Menu() {
	const { t } = useTranslation('menu')

	return (
		<List bg="chakra-body-bg" color="chakra-body-text">
			{Object.entries(resources).map(([name, info]) => (
				<MenuItem
					key={name}
					to={`/${name}`}
					icon={<InfoIcon />}
					text={t(name)}
				/>
			))}
		</List>
	)
}
