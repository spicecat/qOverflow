import { createContext, useContext, useState } from 'react'

const initialUserData = {
    username: '',
}

const UserContext = createContext(initialUserData)

export default function UserProvider({ children }) {
    const [userData, setUserData] = useState(initialUserData)

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)