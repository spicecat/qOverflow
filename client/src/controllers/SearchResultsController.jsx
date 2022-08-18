import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ListQuestion, LoadingBar } from 'components';
import { PaginatedList } from 'controllers';
import { searchQuestions } from 'services/questionsServices';

export default function SearchResultsController() {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        const creator = searchParams.get('creator');
        const title = searchParams.get('title');
        const text = searchParams.get('text');
        let tags = searchParams.get('tags');
        let time = searchParams.get('createdAt');
        let createdAt = {};

        if (time) {
            time = new Date(time);
            createdAt['$gte'] = parseInt(time.getTime());
            time.setDate(time.getDate() + 1);
            createdAt['$lte'] = time.getTime();
        }
        if (tags) {
            tags = tags.split(' ');
        }

        setLoading(() => true);
        const { questions } = await searchQuestions({ creator, title, text, tags, createdAt });
        setLoading(() => false);

        return questions;
    };

    return (
        <>
            {loading && <LoadingBar />}
            <PaginatedList {...{ concat: true, Component: ListQuestion, getData }} />
        </>
    );
}
