import Button from '@material-ui/core/Button'
import LanguageIcon from '@material-ui/icons/Language'
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
