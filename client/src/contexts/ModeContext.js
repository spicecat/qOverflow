import { createContext, useContext, useState } from 'react';

const ModeContext = createContext();

export default function ModeProvider({ children }) {
    const [mode, setMode] = useState('light');

    return (
        <ModeContext.Provider value={{ mode, setMode }}>
            {children}
        </ModeContext.Provider>
    );
}

export const useMode = () => useContext(ModeContext);
