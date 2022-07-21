import { UserProvider, FormProvider, ErrorProvider } from '.';

export default function ContextProvider({ children }) {
    return (
        <UserProvider>
            <FormProvider>
                <ErrorProvider>{children}</ErrorProvider>
            </FormProvider>
        </UserProvider>
    );
}
