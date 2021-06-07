import {makeStyles} from "@material-ui/core/styles"

const Styles = makeStyles(() => (
    {
        container: {
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            '& .MuiFormLabel-root-411': {
                fontSize: '1.1rem'
            },
            '& .MuiTypography-body2-120': {
                fontSize: '0.95rem'
            },
            '& .MuiCardContent-root-291': {
                padding: 40
            }
        },
        photo: {
            '& > img': {
                width: '100%',
                maxHeight: 300,
                objectFit: 'contain',
                margin: 0
            }
        },
        rightSide: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            '& > div': {
                flex: 1
            }
        },
        stepper: {
            width: '100%'
        },
        table: {
            borderTop: '1px solid #ddd',
            '& td': {
                textAlign: 'center !important'
            }
        },
        widthOneThird: {
            width: '33%'
        },
        textSecondary: {
            fontStyle: 'italic',
            color: '#737373'
        },
        subtitle: {
            marginTop: 45,
            fontSize: '1.1rem'
        }
    }
))

export default Styles
