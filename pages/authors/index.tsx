import { Button } from '@chakra-ui/react'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { Author } from '@prisma/client'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { HeadTitle, Icon, Layout, ResourceTable } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	const translationProps = await serverSideTranslations(locale!, [
		'common',
		'fields',
	])

	const queryClient = new QueryClient()

	return {
		props: {
			dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
			...translationProps,
		},
	}
}

const AuthorsPage: NextPage = () => {
	const { t } = useTranslation('common', { keyPrefix: 'menu.items' })
	const { data } = useQuery<{ authors: Author[]; total: number }>(['authors'])

	return (
		<>
			<HeadTitle title={t('authors')} />
			<Layout
				fullSize
				// leftActions={<Search onChange={search} />}
				rightActions={
					<Link href={`/authors/create`} passHref>
						<Button as="a" leftIcon={<Icon icon={faAdd} />}>
							Create
						</Button>
					</Link>
				}
			>
				<ResourceTable
					data={data?.authors}
					fields={['lastName', 'firstName', 'middleName']}
					href="/authors"
					sort={() => {}}
					search={undefined}
				/>
			</Layout>
		</>
	)
}

export default AuthorsPage
