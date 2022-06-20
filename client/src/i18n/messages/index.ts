import { Locale } from 'user'
import englishMessages from './english.messages'
import russianMessages from './russian.messages'

const messages = {
	[Locale.En]: englishMessages,
	[Locale.Ru]: russianMessages,
}

export default messages
