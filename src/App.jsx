import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
    ForgotPassword,
    Layout,
    Login,
    Mail,
    NotFound,
    Question,
    Questions,
    Signup,
    User,
} from './containers';
import { UserProvider } from './contexts';

export default function App() {
    return (
        <BrowserRouter basename=''>
            <UserProvider>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Questions />} />

                        <Route path='questions'>
                            <Route index element={<Questions />} />
                            <Route path=':question_id' element={<Question />} />
                        </Route>

                        <Route path='mail' element={<Mail />} />

                        <Route path='users'>
                            <Route index element={<User />} />
                            <Route path=':user_id' element={<User />} />
                            <Route
                                path='forgot-password'
                                element={<ForgotPassword />}
                            />
                            <Route path='login' element={<Login />} />
                            <Route path='signup' element={<Signup />} />
                        </Route>

                        <Route path='*' element={<NotFound />} />
                    </Route>
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}
