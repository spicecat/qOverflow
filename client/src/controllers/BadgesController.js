import { useEffect, useState } from 'react';

import { Badges } from 'components';
import { getUserBadges } from 'services/userServices';

export default function BadgesController() {
    const [badges, setBadges] = useState();

    useEffect(() => {
        const loadBadges = async () => {
            const { badges: newBadges } = await getUserBadges();
            setBadges(newBadges);
        };
        loadBadges();
    }, []);

    return (
        badges && Badges({ badges })
    );
}
