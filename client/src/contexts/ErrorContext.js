import { createContext, useContext, useState } from 'react';

const initialErrorData = '';

const ErrorContext = createContext();

export default function ErrorProvider({ children }) {
    const [error, setError] = useState(initialErrorData);

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            {children}
        </ErrorContext.Provider>
    );
}

export const useError = () => useContext(ErrorContext);
