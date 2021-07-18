import bcrypt from 'bcrypt'

export const projectProps = (object, projection) => {
	for (const prop in object) {
		if (!projection[prop]) {
			delete object[prop]
		}
	}
	return object
}

export const removeEmptyProps = (object) => (
	projectProps(object, object)
)

export const generatePassword = (password, salt = 10) => (
	bcrypt.hash(password || null, salt).catch(() => null)
)

export const isCorrectPassword = (password, hash) => (
	bcrypt.compare(password, hash).catch(() => false)
)
