import { createContext, useContext, useState } from 'react';
import { login, register } from '../services/userServices';

const initialUserData = {
    userID: '',
    salt: '',
    username: '',
    points: 0,
};

const UserContext = createContext(initialUserData);

export default function UserProvider({ children }) {
    const [userData, setUserData] = useState(initialUserData);

    const registerUser = async values => {
        console.log(values)
        const res = await register(values)
        setUserData(res)
    }

    return (
        <UserContext.Provider
            value={{ login, register: registerUser, setUserData, userData }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
