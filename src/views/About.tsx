import { Heading, Stack, Text } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'

export default function About() {
	const { t } = useTranslation('about')

	// console.log(t('about:paragraphs', {}, { returnObjects: true }))

	return (
		<>
			<Heading as="h2" size="lg">
				{t('subtitle')}
			</Heading>
			{/* {t<
				{
					title: string
					text: string
				}[]
			>('about:paragraphs', {}, { returnObjects: true }).map(
				({ title, text }) => (
					<Stack as="section" spacing={3} key={title} pt={10}>
						<Heading as="h3" fontSize="xl" fontWeight="bold">
							{title}
						</Heading>
						<Text>{text}</Text>
					</Stack>
				),
			)} */}
		</>
	)
}
