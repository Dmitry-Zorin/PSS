import Button from '@mui/material/Button'
import LanguageIcon from '@mui/icons-material/Language'
import React from 'react'
import { useLocale, useSetLocale, useTranslate } from 'react-admin'
import { Helmet } from 'react-helmet'
import { saveSettings } from '../../requests'

const LocaleSwitcher = () => {
	const locale = useLocale()
	const setLocale = useSetLocale()
	const translate = useTranslate()
	
	const switchLocale = async () => {
		const newLocale = locale === 'en' ? 'ru' : 'en'
		await setLocale(newLocale)
		saveSettings({ locale: newLocale })
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
				<LanguageIcon/>
				{translate('metadata.lang')}
			</Button>
		</>
	)
}

export default LocaleSwitcher
