import { UserProvider, FormProvider, ErrorProvider, ModeProvider } from '.';

export default function ContextProvider({ children }) {
    return (
        <UserProvider>
            <FormProvider>
                <ModeProvider>
                    <ErrorProvider>{children}</ErrorProvider>
                </ModeProvider>
            </FormProvider>
        </UserProvider>
    );
}
