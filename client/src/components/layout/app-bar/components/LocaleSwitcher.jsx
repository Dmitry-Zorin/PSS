import { Language } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useEffect } from 'react'
import { useLocaleState, useTranslate } from 'react-admin'
import { Helmet } from 'react-helmet'
import { saveSettings } from 'requests'
import { getUser } from 'user'

export const LocaleSwitcher = () => {
	const [locale, setLocale] = useLocaleState()
	const translate = useTranslate()

	useEffect(() => {
		setLocale(getUser().locale)
	}, [])

	const switchLocale = async () => {
		const newLocale = locale === 'en' ? 'ru' : 'en'
		await setLocale(newLocale)
		await saveSettings({ locale: newLocale })
	}

	return (
		<>
			<Helmet>
				<html lang={locale} />
				<title lang={locale}>{translate('metadata.title')}</title>
			</Helmet>
			<Button
				color="inherit"
				startIcon={<Language />}
				onClick={switchLocale}
				sx={{ mr: 1 }}
			>
				{translate('metadata.lang')}
			</Button>
		</>
	)
}
