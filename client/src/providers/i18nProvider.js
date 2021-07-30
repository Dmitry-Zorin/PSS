import polyglotI18nProvider from 'ra-i18n-polyglot'
import { resolveBrowserLocale } from 'react-admin'
import englishMessages from '../i18n/en.js'
import russianMessages from '../i18n/ru.js'
import { user } from './authProvider.js'

const { locale } = user || {}

const i18Provider = polyglotI18nProvider(locale => (
	locale === 'ru' ? russianMessages : englishMessages
), locale || resolveBrowserLocale())

export default i18Provider
