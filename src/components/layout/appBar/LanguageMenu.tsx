import {
	Menu,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
} from '@chakra-ui/react'
import { faCheck, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { Icon, MenuIconButton } from 'components'
import setLanguage from 'next-translate/setLanguage'
import useTranslation from 'next-translate/useTranslation'

export default function LanguageMenu() {
	const { t, lang } = useTranslation()

	return (
		<div>
			<Menu>
				<MenuIconButton
					aria-label={t('layout.appBar.languageMenu.label')}
					icon={<Icon icon={faGlobe} boxSize={5} />}
				/>
				<MenuList>
					<MenuOptionGroup
						type="radio"
						value={lang}
						title={t('layout.appBar.languageMenu.title')}
					>
						<MenuItemOption
							value="ru"
							icon={<Icon icon={faCheck} />}
							onClick={() => setLanguage('ru')}
						>
							Русский
						</MenuItemOption>
						<MenuItemOption
							value="en"
							icon={<Icon icon={faCheck} />}
							onClick={() => setLanguage('en')}
						>
							English
						</MenuItemOption>
					</MenuOptionGroup>
				</MenuList>
			</Menu>
		</div>
	)
}
