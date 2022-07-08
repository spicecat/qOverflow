import { Grid, Card, CardContent } from '@mui/material';
import { FormController } from '../controllers';
import { loginSchema } from '../services/schemas';

const signupFields = [
    {
        id: 'username',
        title: 'Username',
    },
    {
        id: 'password',
        title: 'Password',
        type: 'password',
    },
];

export default function Signup() {
    return (
        <Grid
            container
            spacing={2}
            alignItems='center'
            justifyContent='center'
            style={{ height: '95vh' }}
        >
            <Card sx={{ padding: '1vh' }}>
                <CardContent>
                    <FormController
                        fields={signupFields}
                        onSubmit={(e) => console.log(e, 123)}
                        validationSchema={loginSchema}
                    />
                </CardContent>
            </Card>
        </Grid>
    );
}
