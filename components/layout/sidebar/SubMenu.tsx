import { InfoIcon } from '@chakra-ui/icons'
import { List, useDisclosure } from '@chakra-ui/react'
import { Collapse, MenuItem, SubMenuItem } from 'components'
import { useSidebarState } from 'hooks'

export interface SubMenuProps {
	text: string
	items: Record<string, any>
}

export default function SubMenu({ text, items }: SubMenuProps) {
	const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })
	const [isSidebarOpen] = useSidebarState()

	return (
		<>
			<SubMenuItem text={text} open={isOpen} onClick={onToggle} pt={3} />
			<Collapse in={isOpen}>
				<List
				// as={motion.ul}
				// initial={false}
				// animate={{
				// 	paddingLeft: isSidebarOpen ? '2.5rem' : 0,
				// 	transition: gentleSpringConfig,
				// }}
				>
					{Object.entries(items).map(([name, info]) => {
						return (
							<MenuItem
								key={name}
								to={`/${text.toLowerCase()}/${name}`}
								text={name}
								icon={info.icon || <InfoIcon />}
								indent="2.25rem"
							/>
						)
					})}
				</List>
			</Collapse>
		</>
	)
}
