import { Grid, Card, CardContent } from '@mui/material';
import { FormController } from '../controllers';
import { signupSchema } from '../services/schemas';
import { signupFields } from '../services/fields';
import CAPTCHA from '../assets/captcha.jpg';

export default function Signup() {
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
                            fields={signupFields}
                            onSubmit={(e) => console.log(e, 123)}
                            validationSchema={signupSchema}
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
