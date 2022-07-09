import { createContext, useContext, useState } from 'react';

const UserContext = createContext({});

export default function UserProvider({ children }) {
    const [userData, setUserData] = useState({});

    return (
        <UserContext.Provider value={{ setUserData, userData }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
