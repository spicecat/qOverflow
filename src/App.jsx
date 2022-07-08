import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
    Dashboard,
    ForgotPassword,
    Layout,
    Login,
    Mail,
    NotFound,
    Question,
    Questions,
    Register,
    Reset,
    User,
} from './containers';
import { UserProvider } from './contexts';

export default function App() {
    return (
        <BrowserRouter basename=''>
            <UserProvider>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Dashboard />} />

                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                        
                        <Route path='mail' element={<Mail />} />
                        
                        <Route path='questions'>
                            <Route index element={<Questions />} />
                            <Route path=':question_id' element={<Question />} />
                        </Route>

                        <Route path='users'>
                            <Route index element={<User />} />
                            <Route path=':user_id' element={<User />} />

                            <Route path='recover'>
                                <Route index element={<ForgotPassword />} />
                                <Route path=':id' element={<Reset />} />
                            </Route>
                        </Route>

                        <Route path='*' element={<NotFound />} />
                    </Route>
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}
