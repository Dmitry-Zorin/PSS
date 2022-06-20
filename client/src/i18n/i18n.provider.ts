import polyglotI18nProvider from 'ra-i18n-polyglot'
import { resolveBrowserLocale } from 'react-admin'
import { Locale } from 'user'
import messages from './messages'

const i18nProvider = polyglotI18nProvider(
	(locale) => messages[locale as Locale],
	resolveBrowserLocale(),
)

export default i18nProvider
