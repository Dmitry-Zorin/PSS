import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import MenuItem from '@material-ui/core/MenuItem'
import {makeStyles} from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import ExpandMore from '@material-ui/icons/ExpandMore'
import React from 'react'
import {useTranslate} from 'react-admin'

const useStyles = makeStyles(theme => (
    {
        icon: {
            minWidth: theme.spacing(5)
        },
        sidebarIsOpen: {
            '& a': {
                paddingLeft: theme.spacing(4),
            }
        },
        sidebarIsClosed: {
            '& a': {
                paddingLeft: theme.spacing(2),
            }
        },
    }
))

const SubMenu = ({handleToggle, sidebarIsOpen, isOpen, name, icon, children,}) => {
    const translate = useTranslate()
    const classes = useStyles()

    const header = (
        <MenuItem button onClick={handleToggle}>
            <ListItemIcon className={classes.icon}>
                {isOpen ? <ExpandMore/> : icon}
            </ListItemIcon>
            <Typography variant="inherit" color="textSecondary">
                {translate(name)}
            </Typography>
        </MenuItem>
    )

    return (
        <>
            {sidebarIsOpen || isOpen ? header : (
                <Tooltip title={translate(name)} placement="right">
                    {header}
                </Tooltip>
            )}
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List
                    component="div"
                    disablePadding
                    className={
                        sidebarIsOpen
                            ? classes.sidebarIsOpen
                            : classes.sidebarIsClosed
                    }
                >
                    {children}
                </List>
            </Collapse>
        </>
    )
}

export default SubMenu
