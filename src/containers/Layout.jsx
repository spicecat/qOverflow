import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Navbar } from '../components'

export default function Layout() {
    

    

    const [mode, setMode] = useState('light')
    const theme = createTheme({ palette: { mode } })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>
            <main>
                <Navbar />
                

            

            
                <Outlet />
            
            

                



            </main>
        </ThemeProvider>
    )
}