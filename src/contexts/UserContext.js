import { createContext, useContext, useState } from 'react';

const initialUserData = {
    userID: '',
    salt: '',
    username: '',
    points: 0,
};

const UserContext = createContext(initialUserData);

export default function UserProvider({ children }) {
    const [userData, setUserData] = useState(initialUserData);

    return (
        <UserContext.Provider value={{ setUserData, userData }}>
            {children}
        </UserContext.Provider>
    );
}

export function setUserData(data) {
    setUserData((initial) => ({ ...initial, ...data }));
}

export const useUser = () => useContext(UserContext);
