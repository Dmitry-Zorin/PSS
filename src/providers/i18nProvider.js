import polyglotI18nProvider from 'ra-i18n-polyglot'
import { resolveBrowserLocale } from 'react-admin'
import englishMessages from '../i18n/en'
import russianMessages from '../i18n/ru'
import { user } from './authProvider'

const { locale } = user || {}

export default polyglotI18nProvider(locale => (
	locale === 'ru' ? russianMessages : englishMessages
), locale || resolveBrowserLocale())
