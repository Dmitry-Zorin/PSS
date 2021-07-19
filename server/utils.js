import bcrypt from 'bcrypt'
import filter from 'just-filter-object'

export const removeFalsyProps = (object) => (
	filter(object, (_, value) => value)
)

export const projectTruthyProps = (object, projection) => (
	filter(object, (key, value) => projection[key] && value)
)

export const generatePassword = (password, salt = 10) => (
	bcrypt.hash(password || null, salt).catch(() => null)
)

export const isCorrectPassword = (password, hash) => (
	bcrypt.compare(password, hash).catch(() => false)
)
