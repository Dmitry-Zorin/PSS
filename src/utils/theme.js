import {blue} from '@material-ui/core/colors'
import {createMuiTheme} from '@material-ui/core/styles'

const raViewStyle = {
    root: {
        width: '100%',
        maxWidth: '1250px',
        margin: '0 auto'
    }
}

export default createMuiTheme({
    typography: {
        fontFamily: 'OpenSans'
    },
    palette: {
        secondary: {
            light: blue[300],
            main: blue[500],
            dark: blue[700]
        }
    },
    sidebar: {
        width: 255,
        closedWidth: 55,
    },
    overrides: {
        RaShow: raViewStyle,
        RaCreate: raViewStyle,
        RaEdit: raViewStyle,
        RaLayout: {
            root: {
                '& .ra-field > div[class^="MuiFormControl"]': {
                    width: '100%',
                    margin: '0 0 35px 0 !important'
                }
            }
        },
        RaTabbedShowLayout: {
            content: {
                padding: '0 !important'
            }
        },
        RaMenuItemLink: {
            root: {
                borderLeft: '4px solid transparent'
            },
            active: {
                borderLeft: `4px solid ${blue[500]}`,
                background: 'rgba(0, 0, 0, 0.06) !important',
                '& svg': {
                    color: 'rgba(0, 0, 0, 0.65)'
                }
            }
        },
        RaLabeled: {
            label: {
                fontSize: '1.25rem'
            },
            value: {
                '& > *': {
                    fontSize: '1rem'
                }
            }
        },
        MuiCardContent: {
            root: {
                padding: '45px !important'
            }
        },
        MuiStepIcon: {
            active: {
                color: `${blue[500]} !important`
            },
            completed: {
                color: `${blue[500]} !important`
            }
        },
        MuiTab: {
            root: {
                flexGrow: 1,
                maxWidth: 'unset'
            }
        },
        MuiTableCell: {
            sizeSmall: {
                padding: 16
            }
        }
    }
})
