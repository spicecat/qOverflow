<<<<<<< HEAD
import { QuestionProvider, UserProvider, FormProvider} from '.';

=======
import { UserProvider } from 'contexts';
>>>>>>> fb8023fcd79e9e1390e47f3ea4f22a605274b5a4

export default function ContextProvider({ children }) {
    return (
        <UserProvider>
<<<<<<< HEAD
                <QuestionProvider>
                    <FormProvider>
                        {children}
                    </FormProvider>
                </QuestionProvider>
=======
            {children}
>>>>>>> fb8023fcd79e9e1390e47f3ea4f22a605274b5a4
        </UserProvider>
    );
}
