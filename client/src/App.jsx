import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ContextProvider, QuestionProvider } from 'contexts';
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
    Update,
} from 'containers';

export default function App() {
    return (
        <BrowserRouter basename=''>
            <ContextProvider>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Buffet />} />

                        <Route path='dashboard'>
                            <Route index element={<Dashboard />} />
                            <Route path='update' element={<Update />} />
                        </Route>

                        <Route path='mail' element={<Mail />} />

                        <Route path='questions'>
                            <Route index element={<Questions />} />
                            <Route path='search' element={<Search />} />
                            <Route path='ask' element={<Ask />} />
                            <Route
                                path=':question_id'
                                element={<QuestionProvider children={<QA />} />}
                            />
                        </Route>

                        <Route path='users'>
                            <Route path='login' element={<Login />} />
                            <Route path='register' element={<Register />} />
                            <Route path='recover'>
                                <Route index element={<ForgotPassword />} />
                                <Route path=':id' element={<Reset />} />
                            </Route>
                        </Route>

                        <Route path='*' element={<NotFound />} />
                    </Route>
                </Routes>
            </ContextProvider>
        </BrowserRouter>
    )
}