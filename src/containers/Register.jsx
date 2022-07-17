import { Card, CardContent, Grid } from '@mui/material';

import CAPTCHA from 'assets/captcha.jpg';
import { RegisterForm } from 'controllers';

export default function Register() {
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
                        <RegisterForm />
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
