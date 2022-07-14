import { List, Pagination } from '@mui/material';

export default function PaginatedList({
    count,
    Component,
    data,
    handleChangePage,
    page
}) {
    return (
        <List sx={{ width: '100%'}}>
            <Pagination
                count={count}
                onChange={handleChangePage}
                page={page}
            />
            {data.map(item => Component(item))}
        </List>
    );
}
