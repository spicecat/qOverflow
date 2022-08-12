import { Box, List, Pagination } from '@mui/material';

export default function PaginatedList({ count, Component, data, handleChangePage, page }) {
    return (
        <List sx={{ pl: 2, pr: 2, width: '100%', height: '100%' }}>
            {data.map((item, index) => (
                <Component {...item} key={index} />
            ))}
            {count > 1 && (
                <Box fullWidth display='flex' justifyContent='center' sx={{ margin: '1vh 0' }}>
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
