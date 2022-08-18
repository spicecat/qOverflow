import { useState } from 'react';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

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
            setSearchParams({ title: search, text: search, creator: search }, { replace: true });
        } else {
            navigate({
                pathname: '/questions/search',
                search: `?${createSearchParams({
                    title: search, text: search, creator: search
                })}`,
                replace: true,
            });
        }

        setSearch(() => '');
    };

    return <SearchBar value={search} onChange={onChange} onSubmit={onSubmit} />;
}
