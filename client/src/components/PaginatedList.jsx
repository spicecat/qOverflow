import { List, Pagination, Box } from '@mui/material';

import { NoData } from 'components';

export default function PaginatedList({
    count,
    Component,
    data,
    handleChangePage,
    noData = true,
    page,
}) {
    return (
        <List sx={{ pl: 2, pr: 2, width: '100%' }}>
            {data.length
                ? data.map((item) => Component(item))
                : noData && <NoData />}
            {count > 1 && (
                <Box
                    fullWidth
                    display='flex'
                    justifyContent='center'
                    sx={{ margin: '1vh 0' }}
                >
                    <Pagination
                        count={count}
                        onChange={handleChangePage}
                        page={page}
                        siblingCount={1}
                        size='small'
                    />
                </Box>
            )}
        </List>
    );
}
