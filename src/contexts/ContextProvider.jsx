import { UserProvider } from 'contexts';

export default function ContextProvider({ children }) {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    );
}
