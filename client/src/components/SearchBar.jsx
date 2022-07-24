import { alpha, styled } from '@mui/material/styles';
import { InputBase, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
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
    pointerEvents: 'none',
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
        [theme.breakpoints.up('xs')]: {
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchBar() {
    let navigate = useNavigate();

    function navSearch(e) {
        navigate('/questions/search')
    }

    return (
        <Search >
            <SearchIconWrapper>
                <Button style={{ pointerEvents: 'auto' }} variant="contained" startIcon={<SearchIcon />} onClick={navSearch}> Search</Button>
            </SearchIconWrapper>
        </Search>
    );
}
