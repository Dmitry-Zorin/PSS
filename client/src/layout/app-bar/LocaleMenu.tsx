import { Language } from '@mui/icons-material'
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import { useRef, useState } from 'react'
import { useLocaleState } from 'react-admin'
import { Helmet } from 'react-helmet'
import { saveSettings } from 'requests'
import { Locale } from 'user'

const LocaleMenu = () => {
	const menuRef = useRef()
	const [locale, setLocale] = useLocaleState()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	function changeLocale(locale: Locale) {
		setLocale(locale)
		saveSettings({ locale }).catch(null)
	}

	return (
		<>
			<Helmet>
				<html lang={locale} />
				<title lang={locale} />
			</Helmet>
			<Box ref={menuRef}>
				<IconButton onClick={() => setIsMenuOpen(true)}>
					<Language />
				</IconButton>
			</Box>
			<Menu
				anchorEl={menuRef.current}
				open={isMenuOpen}
				onClose={() => setIsMenuOpen(false)}
			>
				<MenuItem onClick={() => changeLocale('en')}>English</MenuItem>
				<MenuItem onClick={() => changeLocale('ru')}>Русский</MenuItem>
			</Menu>
		</>
	)
}

export default LocaleMenu
