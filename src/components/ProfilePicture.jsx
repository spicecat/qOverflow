import Gravatar from 'react-gravatar';

export default function ProfilePicture({ email }) {
    return <Gravatar size={40} email={email} />
}