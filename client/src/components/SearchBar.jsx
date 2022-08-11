import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const Input = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '30vw',
            '&:focus': {
                width: '31vw',
            },
        },
    },
}));

export default function SearchBar({ value, onChange, onSubmit }) {
    return (
        <Search>
            <form {...{ onSubmit }}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <Input {...{ value, onChange, placeholder: 'Search' }} />
            </form>
        </Search>
    );
}
