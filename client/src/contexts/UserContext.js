import { createContext, useContext, useEffect, useState } from 'react';
import { remember } from 'services/userServices';

const initialUserData = {};

const UserContext = createContext();

export default function UserProvider({ children }) {
    const [userData, setUserData] = useState(initialUserData);

    useEffect(() => {
        const loadUserData = async () => {
            const { user } = await remember();
            setUserData(user || initialUserData);
        }
        if (!userData?.username)
            loadUserData();
    }, [userData?.username])

    return (
        <UserContext.Provider
            value={{
                userData,
                setUserData,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
