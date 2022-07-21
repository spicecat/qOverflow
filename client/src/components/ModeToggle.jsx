import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useMode } from 'contexts';

export default function ModeToggle() {
    const { mode, setMode } = useMode();

    const onClick = () => {
        setMode(() => (mode === 'light' ? 'dark' : 'light'));
    };

    if (mode === 'light') {
        return (
            <IconButton
                color='inherit'
                onClick={onClick}
                sx={{ margin: '0 1vh' }}
            >
                <LightModeIcon />
            </IconButton>
        );
    } else {
        return (
            <IconButton
                color='inherit'
                onClick={onClick}
                sx={{ margin: '0 1vh' }}
            >
                <DarkModeIcon />
            </IconButton>
        );
    }
}
