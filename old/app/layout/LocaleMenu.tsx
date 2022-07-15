import { Language } from '@mui/icons-material'
import { IconButton, Menu, MenuItem, Zoom } from '@mui/material'
import type { MouseEvent } from 'react'
import { useState } from 'react'
import { useLocaleState } from 'react-admin'
import { Helmet } from 'react-helmet'
import { saveSettings } from '~/requests'
import type { Locale } from 'user'

const LocaleMenu = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
	const [locale, setLocale] = useLocaleState()

	function changeLocale(newLocale: Locale) {
		if (locale === newLocale) {
			return
		}
		setLocale(newLocale)
		saveSettings({ locale: newLocale }).catch(null)
	}

	return (
		<>
			<Helmet>
				<html lang={locale} />
				<title lang={locale} />
			</Helmet>
			<IconButton
				size="small"
				color="inherit"
				onClick={(event: MouseEvent<HTMLButtonElement>) => {
					setAnchorEl(event.currentTarget)
				}}
			>
				<Language />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={!!anchorEl}
				onClose={() => setAnchorEl(null)}
				TransitionComponent={Zoom}
			>
				<MenuItem selected={locale === 'en'} onClick={() => changeLocale('en')}>
					English
				</MenuItem>
				<MenuItem selected={locale === 'ru'} onClick={() => changeLocale('ru')}>
					Русский
				</MenuItem>
			</Menu>
		</>
	)
}

export default LocaleMenu
