import { useUser } from '../contexts';
import { Navbar } from '../components';

export default function NavbarController() {
    const { logout, userData } = useUser();

    return <Navbar logout={logout} userData={userData} />;
}
