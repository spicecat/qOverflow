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

    const login = (values) => console.log(values, 'login');
    const register = (values) => console.log(values, 'register');

    return (
        <UserContext.Provider
            value={{ login, register, setUserData, userData }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
