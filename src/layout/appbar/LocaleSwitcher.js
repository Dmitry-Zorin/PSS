import Button from '@material-ui/core/Button'
import LanguageIcon from '@material-ui/icons/Language'
import React from 'react'
import { useLocale, useSetLocale } from 'react-admin'
import { saveSettings } from '../../requests.js'

const LocaleSwitcher = () => {
	const locale = useLocale()
	const setLocale = useSetLocale()
	
	const switchLocale = () => {
		const newLocale = locale === 'en' ? 'ru' : 'en'
		setLocale(newLocale)
		saveSettings({ locale: newLocale })
	}
	
	return (
		<Button onClick={switchLocale}>
			<LanguageIcon/>
			{locale === 'en' ? ' English' : ' Русский'}
		</Button>
	)
}

export default LocaleSwitcher
