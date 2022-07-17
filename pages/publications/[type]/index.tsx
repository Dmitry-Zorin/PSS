import {
	Heading,
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
import Link from 'next/link'
import { useRouter } from 'next/router'
import { stdout } from 'process'

export const getServerSideProps: GetServerSideProps = async ({
	res,
	locale,
}) => {
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=10, stale-while-revalidate=59',
	)
	try {
		const publications = await prisma.publication.findMany()
		return {
			props: {
				publications,
				...(await serverSideTranslations(locale!, ['common', 'menu'])),
			},
		}
	} catch (e) {
		stdout.write(e as any)
		return {
			props: {
				error: e,
			},
		}
	}
}

const Publications: NextPage<{
	publications: Publication[]
	error: any
}> = ({ publications, error }) => {
	const router = useRouter()
	const { type } = router.query as { type: string }
	const { t } = useTranslation(['common', 'menu'])

	return (
		<>
			<HeadTitle title={t(type, { ns: 'menu' })} />
			<Layout fullSize>
				<TableContainer>
					<Table
						variant="simple"
						whiteSpace="normal"
						fontSize={{ base: 'sm', xl: 'md' }}
					>
						<Thead>
							<Tr>
								<Th>Title</Th>
								<Th isNumeric>Year</Th>
							</Tr>
						</Thead>
						<Tbody>
							{error && <Heading>{error}</Heading>}
							{publications.map(({ id, title, year }) => (
								<Link key={id} href={`./${type}/${id}`}>
									<Tr
										cursor="pointer"
										transitionProperty="background"
										transitionDuration="fast"
										transitionTimingFunction="ease-out"
										_hover={{ bg: 'border' }}
										_active={{ opacity: 0.85 }}
									>
										<Td>{title}</Td>
										<Td isNumeric>{year}</Td>
									</Tr>
								</Link>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Layout>
		</>
	)
}

export default Publications
