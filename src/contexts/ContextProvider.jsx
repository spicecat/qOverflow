import { QuestionProvider, UserProvider } from '.';

export default function ContextProvider({ children }) {
    return (
        <UserProvider>
            <QuestionProvider>
                {children}
            </QuestionProvider>
        </UserProvider>
    );
}
