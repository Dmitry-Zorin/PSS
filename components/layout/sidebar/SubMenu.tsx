import { InfoIcon } from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/react'
import { Collapse, MenuItem, SubMenuItem, useSidebarState } from 'components'
import { useTranslation } from 'next-i18next'

export interface SubMenuProps {
	text: string
	items: Record<string, any>
}

export default function SubMenu({ text, items }: SubMenuProps) {
	const { t } = useTranslation('menu')
	const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })
	const [isSidebarOpen] = useSidebarState()

	return (
		<>
			{/* <Divider /> */}
			<SubMenuItem text={t(text)} open={isOpen} onClick={onToggle} pt={2} />
			<Collapse in={isOpen}>
				{Object.entries(items).map(([name, info]) => {
					return (
						<MenuItem
							key={name}
							to={`/${text.toLowerCase()}/${name}`}
							text={t(name)}
							icon={info.icon || <InfoIcon />}
							indent={isSidebarOpen}
						/>
					)
				})}
			</Collapse>
		</>
	)
}
