import { QuestionProvider, UserProvider } from 'contexts';

export default function ContextProvider({ children }) {
    return (
        <UserProvider>
            <QuestionProvider>
                {children}
            </QuestionProvider>
        </UserProvider>
    );
}
