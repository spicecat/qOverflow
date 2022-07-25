import { Card, CardContent, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { SearchForm } from 'controllers/FormControllers';
import { PaginatedList } from 'controllers';
import { ListQuestion } from 'components';
import { searchQuestions } from 'services/questionsServices';

export default function Search() {
    const [searchParams] = useSearchParams()

    const getData = async () => {
        const createdAt = searchParams.get('createdAt');
        const creator = searchParams.get('creator');
        const text = searchParams.get('text');
        const title = searchParams.get('title');
        console.log(new Date(createdAt))
        const { questions } = await searchQuestions({ regexMatch: { creator, text, title } })
        return questions;
    }

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant='h3' align='center'>Search</Typography>
                    <SearchForm />
                </CardContent>
            </Card>
            <PaginatedList {...{ Component: ListQuestion, getData }} />;
        </div>
    )
}          
