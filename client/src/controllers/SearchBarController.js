import { useState } from 'react';
import { createSearchParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { SearchBar } from 'components';

export default function SearchBarController() {
    const [, setSearchParams] = useSearchParams();
    const location = useLocation();
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const onChange = (e) => setSearch(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();

        if (location.pathname === '/questions/search') {
            setSearchParams({ title: search }, { replace: true });
        } else {
            navigate({
                pathname: '/questions/search',
                search: `?${createSearchParams({ title: search })}`,
                replace: true,
            });
        }

        setSearch(() => '');
    };

    return <SearchBar value={search} onChange={onChange} onSubmit={onSubmit} />;
}
