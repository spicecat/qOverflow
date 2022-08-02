import { useEffect, useState } from 'react';
import { PaginatedList } from 'components';

const rowsPerPage = 5;
export default function PaginatedListController({ count, Component, getData, noData }) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [load, setLoad] = useState(true);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
        if (load && newPage > ((count ?? data.length) - 100) / rowsPerPage)
            loadData();
    };

    const loadData = async () => {
        const newData = await getData(data[data.length - 1] ?? {});
        if (newData.length)
            setData(data.concat(newData));
        else
            setLoad(false);
    }

    useEffect(() => {
        loadData();
    }, [getData]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         loadQuestions(sort);
    //     }, 60000);

    return (
        <PaginatedList {...{
            count: Math.ceil((count ?? data.length) / rowsPerPage),
            data: data.filter(d => d).slice((page - 1) * rowsPerPage, page * rowsPerPage),
            Component,
            handleChangePage,
            noData,
            page,
            rowsPerPage
        }} />
    );
}
