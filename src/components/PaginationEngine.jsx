import { useState, useEffect } from 'react';

export default function PaginationEngine({ components, page, count }) {
    const [bounds, setBounds] = useState({
        first: 0,
        last: 0,
    });

    function calculateDataset() {
        setBounds(() => ({ first: (page - 1) * count, last: page * count }));
    }

    useEffect(calculateDataset, [page, count]);

    return components.slice(bounds.first, bounds.last);
}
