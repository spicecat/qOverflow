import { useUser } from 'contexts';
import { Form } from 'controllers/FormControllers';
import { composeMailFields } from 'services/fields';
import { postMail } from 'services/mailServices';
import { mailSchema } from 'services/schemas';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function SendMailController() {

    const { userData } = useUser();

    const navigate = useNavigate();
    useEffect(() => {
        if(checkAuth()){
            navigate('/users/login', {state: {name : 'ask', msg : 'you need to be authenticated to access this feature' , prevPath: '/ask'}})
        }
    }, []);

    function checkAuth(){
        
        if(!userData.username){
            return true;
        }
    }

    const sendMail = ({ reciever, subject, text }) =>
        postMail(userData.username, reciever, subject, text);

    return (
        <Form
            fields={composeMailFields}
            onSubmit={sendMail}
            validationSchema={mailSchema}
        />
    );
}
