import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Buffet, Dashboard, Layout, Mail, NotFound, QA } from './containers'
import { UserProvider } from './contexts'

export default function App() {
  return <BrowserRouter basename=''>
    <UserProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Buffet />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='mail' element={<Mail />} />
          <Route path='qa' element={<QA />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </UserProvider>
  </BrowserRouter>
}