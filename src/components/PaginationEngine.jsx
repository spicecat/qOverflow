import { useState, useEffect } from 'react';
import NoQuestions from './NoQuestions';

export default function PaginationEngine({ components, page, count }) {
    const [bounds, setBounds] = useState({
        first: 0,
        last: 0,
    });

    function calculateDataset() {
        setBounds(() => ({ first: (page - 1) * count, last: page * count }));
    }

    useEffect(calculateDataset, [page, count]);
    if(components === 0){
        return <NoQuestions/>
    }
    return components.slice(bounds.first, bounds.last);
}
