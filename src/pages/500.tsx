import { BasicLayout, Error } from 'components'
import { ReactElement } from 'react'

function Error500Page() {
	return <Error status={500} message="¯\_( ✖ ෴ ✖ )_/¯" />
}

// Error500Page.getLayout = (page: ReactElement) => (
// 	<BasicLayout>{page}</BasicLayout>
// )

export default Error500Page
