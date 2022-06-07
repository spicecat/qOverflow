import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, Layout, NotFound } from './containers'

export default function App() {
  return <BrowserRouter basename=''>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
}