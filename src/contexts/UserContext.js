import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/userServices';

const UserContext = createContext({});

export default function UserProvider({ children }) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    async function validateLogin(values) {
        const { success, error, ...user } = await login(values);
        if (success) {
            setUserData(user);
            navigate('/');
        } else
            return { username: 'Username or password incorrect' };
    }
    async function validateRegister(values) {
        const { success, error } = await register(values);
        if (success) return validateLogin(values);
        else {
            switch (error) {
                case 'an item with that "username" already exists':
                    return { username: 'Username already exists' };
                case 'an item with that "email" already exists':
                    return { email: 'Email already exists' };
                default:
                    return;
            }
        }
    }

    return (
        <UserContext.Provider value={{ validateLogin, setUserData, userData, validateRegister }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
