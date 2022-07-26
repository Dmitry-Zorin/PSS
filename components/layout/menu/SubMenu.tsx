import { InfoIcon } from '@chakra-ui/icons'
import { List, useDisclosure } from '@chakra-ui/react'
import { Collapse, MenuItem, SubMenuItem } from 'components'

export interface SubMenuProps {
	text: string
	items: Record<string, any>
}

export default function SubMenu({ text, items }: SubMenuProps) {
	const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

	return (
		<>
			<SubMenuItem text={text} open={isOpen} onClick={onToggle} pt={2} />
			<Collapse in={isOpen} m={-1}>
				<List p={1}>
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
