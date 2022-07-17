import { QuestionProvider, UserProvider, FormProvider} from '.';


export default function ContextProvider({ children }) {
    return (
        <UserProvider>
                <QuestionProvider>
                    <FormProvider>
                        {children}
                    </FormProvider>
                </QuestionProvider>
        </UserProvider>
    );
}
