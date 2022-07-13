import Typography from '@mui/material/Typography'
import { json, LoaderFunction, MetaFunction } from '@remix-run/node'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { MainArea } from '~/components'
import { i18next } from '~/lib/i18n.server'

export const handle = {
	i18n: 'about',
}

export const loader: LoaderFunction = async ({ request }) => {
	const t = await i18next.getFixedT(request, 'about')
	return json({ name: t('name') })
}

export const meta: MetaFunction = ({ data, parentsData }) => ({
	title: `${data.name} | ${parentsData.root.title}`,
})

export default function About() {
	const { t } = useTranslation('about')

	return (
		<>
			<MainArea title={t('title')}>
				<Typography variant="body1">{t('description')}</Typography>
				{/* {(
					t('paragraphs', { returnObjects: true }) as {
						title: string
						text: string
					}[]
				).map(({ title, text }) => (
					<Fragment key={title}>
						<Typography variant="subtitle1">{title}</Typography>
						<Typography>{text}</Typography>
					</Fragment>
				))} */}
			</MainArea>
		</>
	)
}
