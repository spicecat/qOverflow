import { useEffect, useState } from 'react';
import { PaginatedList } from 'components';
import { useSearchParams } from 'react-router-dom';

const rowsPerPage = 5;
export default function PaginatedListController({
    concat = true,
    count,
    Component,
    getData,
    noData,
}) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [load, setLoad] = useState(true);
    const searchParams = useSearchParams();

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
        if (load && newPage > ((count ?? data.length) - 100) / rowsPerPage)
            loadData();
    };

    const loadData = async () => {
        const newData = await getData(
            concat ? data[data.length - 1] ?? {} : {}
        );
        if (newData.length)
            if (concat) setData(data.concat(newData));
            else setData(newData);
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
                data: data
                    .filter((d) => d)
                    .slice((page - 1) * rowsPerPage, page * rowsPerPage),
                Component,
                handleChangePage,
                noData,
                page,
                rowsPerPage,
            }}
        />
    );
}
