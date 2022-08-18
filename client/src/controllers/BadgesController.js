import { useEffect, useState } from 'react';

import { Badges } from 'components';
import { getUserBadges } from 'services/userServices';

export default function BadgesController() {
    const [badges, setBadges] = useState();

    useEffect(() => {
        const loadBadges = async () => {
            const { badges: newBadges } = await getUserBadges();
            console.log(123123, newBadges)
            setBadges(newBadges);
        };
        loadBadges();
    }, []);

    return (
        badges && Badges({ badges })
    );
}
