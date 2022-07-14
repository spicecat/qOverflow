import { useState } from 'react';
import { List, Pagination } from '@mui/material';

const rowsPerPage = 5;
export default function PaginatedList({ count = 0, Component, data }) {
    const [page, setPage] = useState(1);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    return data && (
        <List>
            <Pagination
                count={Math.ceil(count / rowsPerPage)}
                onChange={handleChangePage}
                page={page}
            />
            {data.slice((page - 1) * rowsPerPage, page * rowsPerPage).map(item => Component(item))}
        </List>
    );
}
