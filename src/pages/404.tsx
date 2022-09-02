import { BasicLayout, Error } from 'components'
import { ReactElement } from 'react'

function Error404Page() {
	return <Error status={404} message="¯\_( ◉ _ ◉ )_/¯" />
}

// Error404Page.getLayout = (page: ReactElement) => (
// 	<BasicLayout>{page}</BasicLayout>
// )

export default Error404Page
