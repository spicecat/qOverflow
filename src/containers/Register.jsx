import { Grid, Card, CardContent } from '@mui/material';
import CAPTCHA from '../assets/captcha.jpg';
import { useUser } from '../contexts';
import { FormController } from '../controllers';
import { registerSchema } from '../services/schemas';
import { registerFields } from '../services/fields';

export default function Register() {
    const { register } = useUser();

    return (
        <Grid
            container
            spacing={2}
            alignItems='center'
            justifyContent='center'
            style={{ height: '95vh' }}
        >
            <Grid item xs={3.5} />
            <Grid item xs={5}>
                <Card sx={{ padding: '1vh' }}>
                    <CardContent>
                        <FormController
                            fields={registerFields}
                            onSubmit={register}
                            validationSchema={registerSchema}
                        />
                        <div>
                            <img src={CAPTCHA} alt='CAPTCHA' />
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3.5} />
        </Grid>
    );
}
