import { useEffect, useState } from 'react'
import { CreationInfoTag } from '../components';
import { getUser } from '../services/userServices';

export default function CreationInfoTagController({ creator, ...props }) {
    const [creatorInfo, setCreatorInfo] = useState()

    useEffect(() => {
        const loadCreator = async () => {
            const { user } = await getUser(creator)
            setCreatorInfo(user);
        }
        loadCreator();
    }, [creator]);

    return creatorInfo && (
        <CreationInfoTag {...{ creatorInfo, ...props }} />
    );
}
