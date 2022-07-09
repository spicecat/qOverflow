import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
    Ask,
    Buffet,
    Dashboard,
    ForgotPassword,
    Layout,
    Login,
    Mail,
    NotFound,
    QA,
    Questions,
    Register,
    Reset,
    Search,
} from './containers';
import { ContextProvider } from './components';

export default function App() {
    return (
        <BrowserRouter basename=''>
            <ContextProvider>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Buffet />} />

                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />

                        <Route path='mail' element={<Mail />} />

                        <Route path='questions'>
                            <Route index element={<Questions />} />
                            <Route path='search' element={<Search />} />
                            <Route path='ask' element={<Ask />} />
                            <Route path=':question_id' element={<QA />} />
                        </Route>

                        <Route path='dashboard' element={<Dashboard />} />

                        <Route path='recover'>
                            <Route index element={<ForgotPassword />} />
                            <Route path=':username' element={<Reset />} />
                        </Route>

                        <Route path='*' element={<NotFound />} />
                    </Route>
                </Routes>
            </ContextProvider>
        </BrowserRouter>
    );
}
