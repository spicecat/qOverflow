import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from 'services/userServices';

const initialUserData = {};

const UserContext = createContext();

export default function UserProvider({ children }) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(initialUserData);

    const validateLogin = async (values) => {
        const { success, error, ...user } = await login(values);
        if (success) {
            setUserData(user);
            navigate('/');
        } else return { username: 'Username or password incorrect' };
    }

    const validateRegister = async (values) => {
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

    const logout = () => {
        setUserData(initialUserData);
        navigate('/');
    }

    return (
        <UserContext.Provider
            value={{
                logout,
                userData,
                validateLogin,
                validateRegister
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
