import { Card, CardContent, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { SearchForm } from 'controllers/FormControllers';
import { PaginatedList } from 'controllers';
import { ListQuestion } from 'components';
import { searchQuestions } from 'services/questionsServices';

export default function Search() {
    const [searchParams] = useSearchParams()

    const getData = async () => {
        let matchObj = {};

        const newdate = new Date(searchParams.get('createdAt'));
        const creator = searchParams.get('creator');
        const text = searchParams.get('text');
        const title = searchParams.get('title');
        
        const time = {}

        time["$gte"] = parseInt(newdate.getTime());
        newdate.setDate(newdate.getDate() + 1)
        time["$lte"] = newdate.getTime()

        const createdAt = time



        const { questions } = await searchQuestions({ regexMatch: { creator, text, title }, match: {createdAt} } )


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
