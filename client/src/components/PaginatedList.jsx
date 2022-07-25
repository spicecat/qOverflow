import { List, Pagination } from '@mui/material';

import { NoData } from 'components';

export default function PaginatedList({
    count,
    Component,
    data,
    handleChangePage,
    page
}) {
    return (
        <List sx={{ pl: 2, pr: 2, width: '100%' }}>
            {count > 1 && (
                <Pagination
                    count={count}
                    onChange={handleChangePage}
                    page={page}
                />
            )}
            {
                data.length
                    ? data.map(item => Component(item))
                    : <NoData />
            }
        </List>
    );
}
