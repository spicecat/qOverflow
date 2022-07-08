import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
    Buffet,
    Dashboard,
    ForgotPassword,
    Layout,
    Login,
    Mail,
    NotFound,
    Question,
    Questions,
    Register,
    Reset
} from './containers';
import { UserProvider } from './contexts';

export default function App() {
    return (
        <BrowserRouter basename=''>
            <UserProvider>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Buffet />} />

                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />

                        <Route path='mail' element={<Mail />} />

                        <Route path='questions'>
                            <Route index element={<Questions />} />
                            <Route path=':question_id' element={<Question />} />
                        </Route>

                        <Route path='dashboard' element={<Dashboard />} />

                        <Route path='recover'>
                            <Route index element={<ForgotPassword />} />
                            <Route path=':id' element={<Reset />} />
                        </Route>

                        <Route path='*' element={<NotFound />} />
                    </Route>
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}
