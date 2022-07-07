import { Outlet } from 'react-router-dom'
import { Navbar } from '../components'

export default function Layout() {
    return (
        <div className='body'>
            <Navbar />
            <Outlet />
        </div>
    )
}