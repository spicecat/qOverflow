import { Card, CardContent, Grid } from '@mui/material';
import { Helmet } from 'react-helmet';

import CAPTCHA from 'assets/captcha.jpg';
import { RegisterForm } from 'controllers/FormControllers';

export default function Register() {
    return (
        <>
            <Helmet>
                <title>Register - qOverflow</title>
            </Helmet>
            <Grid
                container
                spacing={2}
                alignItems='center'
                justifyContent='center'
                style={{ height: '92vh' }}
            >
                <Grid item xs />
                <Grid item xs={11} sm={7} md={5}>
                    <Card sx={{ padding: '1vh' }}>
                        <CardContent>
                            <RegisterForm />
                            <div>
                                <img src={CAPTCHA} alt='CAPTCHA' />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs />
            </Grid>
        </>
    );
}
