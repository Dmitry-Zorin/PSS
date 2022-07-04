import { Divider, List } from '@mui/material'
import { SubMenuItem } from 'layout'
import { Children, cloneElement, ReactElement, useState } from 'react'
import { Collapse } from 'components'

interface SubMenuProps {
	name: string
	icon: ReactElement
	children: ReactElement[]
}

const SubMenu = ({ name, icon, children }: SubMenuProps) => {
	const [isOpen, setIsOpen] = useState(true)

	return (
		<>
			<Divider sx={{ m: 2 }} />
			<SubMenuItem
				icon={icon}
				text={name}
				open={isOpen}
				onClick={() => setIsOpen((e) => !e)}
			/>
			<Collapse in={isOpen}>
				<List disablePadding>
					{Children.map(children, (child) =>
						cloneElement(child, {
							sx: {
								pl: 'calc(9.7px + 15.75%)',
							},
						}),
					)}
				</List>
			</Collapse>
		</>
	)
}

// x + y * 2.99 = 56
// x + y * 0.4 = 16
// y = 40 / 2.54

export default SubMenu
