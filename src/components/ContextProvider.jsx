import { QuestionProvider, UserProvider } from '../contexts';

export default function ContextProviders({ children }) {
    return (
        <UserProvider>
            <QuestionProvider>{children}</QuestionProvider>
        </UserProvider>
    );
}
