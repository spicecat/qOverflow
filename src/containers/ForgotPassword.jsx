import { Card, CardContent, Grid } from '@mui/material';

import { ForgotPasswordController } from '../controllers';
import { recoverFields } from '../services/fields';
import { recoverSchema } from '../services/schemas';

export default function ForgotPassword() {
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
                        <ForgotPasswordController />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3.5} />
        </Grid>
    );
}
