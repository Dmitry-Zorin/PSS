import {
	Menu,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
	useColorMode,
} from '@chakra-ui/react'
import { faCheck, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { Icon, MenuIconButton } from 'components'
import useTranslation from 'next-translate/useTranslation'
import { SystemColorModeContext } from 'providers/ThemeProvider'
import { useContext, useEffect, useState } from 'react'

export default function ColorModeMenu() {
	const { t } = useTranslation()
	const { colorMode, setColorMode } = useColorMode()

	const [optionValue, setOptionValue] = useState<typeof colorMode | 'system'>(
		'system',
	)

	const { shouldUseSystemColorMode, setUseSystemColorMode } = useContext(
		SystemColorModeContext,
	)

	useEffect(() => {
		setOptionValue(shouldUseSystemColorMode ? 'system' : colorMode)
		if (shouldUseSystemColorMode) {
			localStorage.removeItem('chakra-ui-color-mode')
		}
	}, [shouldUseSystemColorMode, colorMode])

	return (
		<div>
			<Menu>
				<MenuIconButton
					aria-label={t('layout.appBar.colorModeMenu.label')}
					icon={
						<Icon icon={colorMode === 'dark' ? faMoon : faSun} boxSize={5} />
					}
				/>
				<MenuList transform="none">
					<MenuOptionGroup
						type="radio"
						value={optionValue}
						title={t('layout.appBar.colorModeMenu.title')}
					>
						<MenuItemOption
							value="light"
							icon={<Icon icon={faCheck} />}
							onClick={() => {
								setUseSystemColorMode(false)
								setColorMode('light')
							}}
						>
							{t('layout.appBar.colorModeMenu.items.light')}
						</MenuItemOption>
						<MenuItemOption
							value="dark"
							icon={<Icon icon={faCheck} />}
							onClick={() => {
								setUseSystemColorMode(false)
								setColorMode('dark')
							}}
						>
							{t('layout.appBar.colorModeMenu.items.dark')}
						</MenuItemOption>
						<MenuItemOption
							value="system"
							icon={<Icon icon={faCheck} />}
							onClick={() => {
								setUseSystemColorMode(true)
							}}
						>
							{t('layout.appBar.colorModeMenu.items.system')}
						</MenuItemOption>
					</MenuOptionGroup>
				</MenuList>
			</Menu>
		</div>
	)
}
