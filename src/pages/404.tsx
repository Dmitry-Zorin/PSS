import { Error } from 'components'

function Error404Page() {
	return <Error status={404} message="¯\_( ◉ _ ◉ )_/¯" />
}

Error404Page.useLayout = false

export default Error404Page
