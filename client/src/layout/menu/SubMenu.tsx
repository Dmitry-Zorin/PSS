import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { List } from '@mui/material'
import { MenuItem } from 'layout'
import { Children, cloneElement, ReactElement, useState } from 'react'
import { animated, config, useSpring } from 'react-spring'

interface SubMenuProps {
	name: string
	icon: ReactElement
	children: ReactElement[]
}

const AnimatedList = animated(List)

const SubMenu = ({ name, icon, children }: SubMenuProps) => {
	const [isOpen, setIsOpen] = useState(true)
	const style2 = useSpring({
		height: isOpen ? 46 * children.length : 0,
		overflow: 'hidden',
		config: {
			...config.gentle,
			mass: 0.5,
		},
	})

	return (
		<>
			<MenuItem icon={icon} text={name} onClick={() => setIsOpen((e) => !e)}>
				{isOpen ? <ExpandLess /> : <ExpandMore />}
			</MenuItem>
			<AnimatedList component="div" style={style2} disablePadding>
				{Children.map(children, (child) =>
					cloneElement(child, { sx: { pl: 'calc(9.7px + 15.75%)' } }),
				)}
			</AnimatedList>
		</>
	)
}

// x + y * 2.99 = 56
// x + y * 0.4 = 16
// y = 40 / 2.54

export default SubMenu
