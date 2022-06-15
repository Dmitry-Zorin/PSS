import polyglotI18nProvider from 'ra-i18n-polyglot'
import { resolveBrowserLocale } from 'react-admin'
import messages from './messages'

const i18Provider = polyglotI18nProvider(
	(locale) => messages[locale],
	resolveBrowserLocale(),
)

export default i18Provider
