import { Link } from 'react-router-dom'

export default function NotFound() {

    return (
        <>
            Page not found (404)
            <br />
            <Link to='/'>Return Home</Link>
        </>
    )
}