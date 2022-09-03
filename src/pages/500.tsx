import { Error } from 'components'

function Error500Page() {
	return <Error status={500} message="¯\_( ✖ ෴ ✖ )_/¯" />
}

Error500Page.useLayout = false

export default Error500Page
