import { Card, CardContent, Typography } from '@mui/material';

import { SearchForm } from 'controllers/FormControllers';
import { SearchResults } from 'controllers';

export default function Search() {
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant='h3' align='center'>
                        Search
                    </Typography>
                    <SearchForm />
                </CardContent>
            </Card>
            <SearchResults />
        </>
    );
}
