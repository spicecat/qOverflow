import { UserProvider, FormProvider, ModeProvider } from '.';

export default function ContextProvider({ children }) {
    return (
        <UserProvider>
            <FormProvider>
                <ModeProvider>{children}</ModeProvider>
            </FormProvider>
        </UserProvider>
    );
}
