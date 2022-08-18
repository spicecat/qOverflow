import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { remember } from 'services/userServices';

const initialUserData = { loading: true };

const UserContext = createContext();

export default function UserProvider({ children }) {
    const [userData, setUserData] = useState(initialUserData)
    const navigate = useNavigate();




    useEffect(() => {
        const loadUserData = async () => {
            const { user, error } = await remember();
            if (error) navigate('/users/login')
            else setUserData(user || { loading: false });
        };
        if (userData.loading) loadUserData();
    }, [userData.loading]);

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
