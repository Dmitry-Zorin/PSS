import type { TranslationMessages } from 'react-admin'
import type { Locale } from '~/user'
import englishMessages from './english.messages'
import russianMessages from './russian.messages'

const messages: Record<Locale, TranslationMessages> = {
	en: englishMessages,
	ru: russianMessages,
}

export default messages
