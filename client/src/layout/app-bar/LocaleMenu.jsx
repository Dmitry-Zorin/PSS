import { Language } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { Locale } from 'i18n/messages'
import { useEffect, useRef, useState } from 'react'
import { useLocaleState } from 'react-admin'
import { Helmet } from 'react-helmet'
import { saveSettings } from 'requests'
import { getUser } from 'user'

export const LocaleMenu = () => {
	const [locale, setLocale] = useLocaleState()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const menuRef = useRef()

	useEffect(() => {
		setLocale(getUser().settings.locale)
	}, [setLocale])

	const switchLocaleTo = async (locale) => {
		setLocale(locale)
		await saveSettings({ locale })
	}

	return (
		<>
			<Helmet>
				<html lang={locale} />
				<title lang={locale} />
			</Helmet>
			<IconButton ref={menuRef} onClick={() => setIsMenuOpen(true)}>
				<Language />
			</IconButton>
			<Menu
				anchorEl={menuRef.current}
				open={isMenuOpen}
				onClose={() => setIsMenuOpen(false)}
			>
				<MenuItem onClick={() => switchLocaleTo(Locale.En)}>English</MenuItem>
				<MenuItem onClick={() => switchLocaleTo(Locale.Ru)}>Русский</MenuItem>
			</Menu>
		</>
	)
}
