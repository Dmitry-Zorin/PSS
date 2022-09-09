import { Author } from '@prisma/client'

type AuthorName = Pick<Author, 'lastName' | 'firstName' | 'middleName'>

export function getAuthorName<Name extends AuthorName>(author: Name) {
	const { firstName, middleName, lastName } = author
	const isEnglishName = /\w/.test(firstName)

	return middleName
		? isEnglishName
			? `${firstName} ${middleName} ${lastName}`
			: `${lastName} ${firstName} ${middleName}`
		: `${author.firstName} ${author.lastName}`
}

export function addAuthorName<Name extends AuthorName>(author: Name) {
	return { ...author, fullName: getAuthorName(author) }
}

export function formatAuthors<Name extends AuthorName>(
	authors: { author: Name; order: number }[],
) {
	return authors
		.sort((a, b) => a.order - b.order)
		.map(({ author }) => ({
			...author,
			fullName: getAuthorName(author),
		}))
}
