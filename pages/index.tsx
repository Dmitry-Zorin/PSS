import { HeadTitle } from 'components'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import IndexView from 'views/IndexView'

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: await serverSideTranslations(locale!, ['index', 'common']),
	}
}

const Home: NextPage = () => {
	const { t } = useTranslation(['index', 'common'])

	return (
		<>
			<HeadTitle title={t('name', { ns: 'common' })} />
			<IndexView />
		</>
	)
}

export default Home
