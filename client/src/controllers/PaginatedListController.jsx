import { useEffect, useState } from 'react';
import { PaginatedList } from 'components';

const rowsPerPage = 5;
export default function PaginatedListController({ count = 0, Component, getData }) {
    const [data, setData] = useState();
    const [page, setPage] = useState(1);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        const loadData = async () => {
            setData(await getData())
        }
        loadData();
    }, [getData]);

    return data && (
        <PaginatedList {...{
            count: Math.ceil(count / rowsPerPage),
            data: data.slice((page - 1) * rowsPerPage, page * rowsPerPage),
            Component,
            handleChangePage,
            page,
            rowsPerPage
        }} />
    );
}
