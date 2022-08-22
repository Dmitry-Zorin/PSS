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

export function addAuthorNames<T extends { authors: AuthorName[] }>({
	authors,
	...record
}: T) {
	return {
		...record,
		authors: authors.map((e) => {
			return { ...e, fullName: getAuthorName(e) } as T['authors'][number] & {
				fullName: string
			}
		}),
	}
}
