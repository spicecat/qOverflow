import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PaginatedList } from 'components';

export default function PaginatedListController({
    concat = false,
    count,
    Component,
    getData,
    rowsPerPage = 5,
}) {
    const [searchParams] = useSearchParams();

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [load, setLoad] = useState(concat);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
        if (load && newPage > ((count ?? data.length) - 100) / rowsPerPage) loadData();
    };

    const loadData = async (clear) => {
        const newData = await getData(clear ? {} : data[data.length - 1] ?? {});

        if (newData?.length)
            if (clear) setData(newData);
            else setData(data.concat(newData));
        else setLoad(false);
    };

    useEffect(() => {
        loadData(true);
    }, [searchParams]);

    useEffect(() => {
        const interval = setInterval(() => {
            loadData();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <PaginatedList
            {...{
                count: Math.ceil((count ?? data.length) / rowsPerPage),
                data: data.filter((d) => d).slice((page - 1) * rowsPerPage, page * rowsPerPage),
                Component,
                handleChangePage,
                page,
                rowsPerPage,
            }}
        />
    );
}
