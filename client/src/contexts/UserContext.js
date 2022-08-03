import { createContext, useContext, useEffect, useState } from 'react';
import { remember } from 'services/userServices';

const initialUserData = { loading: true };

const UserContext = createContext({});

export default function UserProvider({ children }) {
    const [userData, setUserData] = useState(initialUserData);

    useEffect(() => {
        const loadUserData = async () => {
            const { user } = await remember();
            setUserData(user || { loading: false });
        }
        if (userData.loading)
            loadUserData();
    }, [userData.loading])

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
