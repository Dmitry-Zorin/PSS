import { Projection } from '../db.types'

const defaultProjection: Projection = {
	headline: 1,
	description: 1,
	type: 1,
	year: 1,
	volume: 1,
	authors: 1,
	character: 1,
	exitDate: 1,
}

export default defaultProjection
