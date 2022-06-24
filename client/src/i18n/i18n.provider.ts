import polyglotI18nProvider from 'ra-i18n-polyglot'
import { resolveBrowserLocale } from 'react-admin'
import { Locale } from 'user'
import messages from './messages'

const i18nProvider = polyglotI18nProvider((locale) => {
	return messages[locale in messages ? (locale as Locale) : 'en']
}, resolveBrowserLocale())

export default i18nProvider
