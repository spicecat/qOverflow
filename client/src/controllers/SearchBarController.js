import { useState } from 'react';
import { SearchBar } from 'components';

export default function SearchBarController() {
    const [search, setSearch] = useState('');

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return <SearchBar value={search} onChange={onChange} onSubmit={onSubmit} />;
}
