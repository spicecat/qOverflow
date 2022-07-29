import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useMode } from 'contexts';
import { Navbar } from 'controllers';

export default function Layout() {
    const { mode } = useMode();

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
            <Helmet>
                <title>qOverflow</title>
            </Helmet>
            <main>
                <Navbar />
                <Box sx={{ height: '92vh' }}>
                    <Outlet />
                </Box>
            </main>
        </ThemeProvider>
    );
}
