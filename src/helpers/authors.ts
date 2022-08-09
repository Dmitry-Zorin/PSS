import { Author } from '@prisma/client'

export function getAuthorName(author: Author) {
	return `${author.firstName} ${author.lastName}`
}

export function getAuthorFullName(author: Author) {
	const { firstName, middleName, lastName } = author
	const isEnglishName = /\w/.test(firstName)
	const fullEnglishName = `${firstName} ${middleName} ${lastName}`
	const fullRussianName = `${lastName} ${firstName} ${middleName}`

	return middleName
		? isEnglishName
			? fullEnglishName
			: fullRussianName
		: getAuthorName(author)
}
