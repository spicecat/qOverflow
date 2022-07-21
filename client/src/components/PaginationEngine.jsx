import { useState, useEffect } from 'react';

export default function PaginationEngine({
    component: Component,
    data,
    page,
    count,
}) {
    const [bounds, setBounds] = useState({
        first: 0,
        last: 0,
    });

    function calculateDataset() {
        setBounds(() => ({ first: (page - 1) * count, last: page * count }));
    }

    useEffect(calculateDataset, [page, count]);

    return data
        .slice(bounds.first, bounds.last)
        .map((obj) => <Component data={obj} key={obj._id} />);
}
