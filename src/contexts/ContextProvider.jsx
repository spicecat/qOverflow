import { UserProvider, FormProvider } from '.';

export default function ContextProvider({ children }) {
    return (
        <UserProvider>
            <FormProvider>
                {children}
            </FormProvider>
        </UserProvider>
    );
}
