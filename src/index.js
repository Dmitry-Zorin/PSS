import {ThemeProvider} from '@material-ui/core/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import AdminPanel from './admin/AdminPanel'
import './fonts.css'
import {ScrollTopButton} from './admin/ScrollTopButton'
import theme from './utils/theme'

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <AdminPanel/>
        <ScrollTopButton/>
    </ThemeProvider>,
    document.getElementById('app')
)
