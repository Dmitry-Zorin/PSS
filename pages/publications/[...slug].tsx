import {
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react'
import { Publication } from '@prisma/client'
import { HeadTitle, Layout } from 'components'
import prisma from 'lib/prisma'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps<{
	locale?: string
}> = async ({ locale }) => {
	const publications = await prisma.publication.findMany()
	return {
		props: {
			publications,
			...(await serverSideTranslations(locale, ['common', 'menu'])),
		},
	}
}

const Publications: NextPage<{
	publications: Publication[]
}> = ({ publications }) => {
	const router = useRouter()
	const [name] = router.query.slug as string[]
	const { t } = useTranslation(['common', 'menu'])

	return (
		<>
			<HeadTitle title={t(name, { ns: 'menu' })} />
			<Layout title="test">
				<TableContainer>
					<Table variant="simple">
						<Thead>
							<Tr>
								<Th>Title</Th>
								<Th isNumeric>Year</Th>
							</Tr>
						</Thead>
						<Tbody>
							{publications.map(({ id, title, year }) => (
								<Tr key={id}>
									<Td>{title}</Td>
									<Td isNumeric>{year}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Layout>
		</>
	)
}

export default Publications
