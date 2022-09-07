import { Heading, Stack, Text } from '@chakra-ui/react'
import { MainArea } from 'components'
import useTranslation from 'next-translate/useTranslation'

export default function About() {
	const { t } = useTranslation('about')

	return (
		<MainArea title={t('common:layout.menu.items.about')}>
			<Stack spacing={8}>
				<Text>{t('common:description')}.</Text>
				<Heading as="h2" size="lg">
					{t('subtitle')}
				</Heading>
				{t<
					{
						title: string
						text: string
					}[]
				>('sections', null, { returnObjects: true }).map(({ title, text }) => (
					<Stack as="section" spacing={2} key={title}>
						<Heading as="h3" fontSize="xl" fontWeight="bold">
							{title}
						</Heading>
						<Text>{text}</Text>
					</Stack>
				))}
			</Stack>
		</MainArea>
	)
}
