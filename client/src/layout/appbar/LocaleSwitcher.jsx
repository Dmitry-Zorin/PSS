import LanguageIcon from '@mui/icons-material/Language'
import Button from '@mui/material/Button'
import React, { useEffect } from 'react'
import { useLocaleState, useTranslate } from 'react-admin'
import { Helmet } from 'react-helmet'
import { getUser } from '../../providers/authProvider'
import { saveSettings } from '../../requests'

const LocaleSwitcher = () => {
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
				<html lang={locale}/>
				<title lang={locale}>
					{translate('metadata.title')}
				</title>
			</Helmet>
			<Button onClick={switchLocale}>
				<LanguageIcon sx={{ mr: 0.5 }}/>
				{translate('metadata.lang')}
			</Button>
		</>
	)
}

export default LocaleSwitcher
