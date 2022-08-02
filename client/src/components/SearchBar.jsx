import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Button } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    pointerEvents: 'none',
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
        width: '25vw',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
    position: 'absolute',
    pointerEvents: 'none',
}));

const Input = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('xs')]: {
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchBar() {
    let navigate = useNavigate();

    function navSearch() {
        navigate('/questions/search')
    }

    return (
        <Search >
            <SearchIconWrapper>
                <Button
                    onClick={navSearch}
                    startIcon={<SearchIcon />}
                    style={{ pointerEvents: 'auto' }}
                    variant='contained'
                >
                    Search
                </Button>
            </SearchIconWrapper>
        </Search>
    );
}
