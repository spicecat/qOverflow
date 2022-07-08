import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { NavbarController } from '../controllers';

export default function Layout() {
    const [mode, setMode] = useState('light');
    const theme = createTheme({
        palette: { mode },
        breakpoints: {
            values: {
                xs: 0,
                sm: 768,
                md: 1024,
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <main>
                <NavbarController />
                <Box sx={{ height: '95vh' }}>
                    <Outlet />
                </Box>
            </main>
        </ThemeProvider>
    );
}
