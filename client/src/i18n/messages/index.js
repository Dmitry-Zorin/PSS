import { enMessages } from './en.messages'
import { ruMessages } from './ru.messages'

export const Locale = {
	En: 'en',
	Ru: 'ru',
}

export default {
	[Locale.En]: enMessages,
	[Locale.Ru]: ruMessages,
}
