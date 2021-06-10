import {blue} from '@material-ui/core/colors'
import {createMuiTheme} from '@material-ui/core/styles'

export default createMuiTheme({
    typography: {
        fontFamily: 'Nunito',
    },
    palette: {
        secondary: {
            light: blue[300],
            main: blue[500],
            dark: blue[700]
        }
    },
    overrides: {
        RaShow: {
           root: {
               width: '100%',
               maxWidth: '1200px',
               margin: '0 auto'
           }
        },
        RaCreate: {
            root: {
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto'
            }
        },
        RaEdit: {
            root: {
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto'
            }
        },
        MuiFormControl: {
            marginDense: {
                margin: '0 0 30px 0 !important'
            }
        },
        MuiTypography: {
            body2: {
                fontSize: '0.95rem'
            }
        },
        MuiFormLabel: {
            root: {
                fontSize: '1.1rem'
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
        RaMenuItemLink: {
            root: {
                borderLeft: '3px solid transparent'
            },
            active: {
                borderLeft: `3px solid ${blue[500]}`,
                background: 'rgba(0, 0, 0, 0.04) !important',
                '& svg': {
                    color: 'rgba(0, 0, 0, 0.65)'
                }
            }
        }
    }
})
