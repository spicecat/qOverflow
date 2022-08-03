import { createContext, useContext, useState } from 'react';

const FormContext = createContext({})

export default function FormProvider({ children }) {
    const [content, setContent] = useState('');

    return (
        <FormContext.Provider
            value={{
                content,
                setContent
            }}>
            {children}
        </FormContext.Provider>
    )
}

export const useForm = () => useContext(FormContext)