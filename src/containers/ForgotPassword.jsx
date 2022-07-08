import { Grid, Card, CardContent } from '@mui/material';
import { FormController } from '../controllers';
import { recoverSchema } from '../services/schemas';
import { recoverFields } from '../services/fields';

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
                        <FormController
                            fields={recoverFields}
                            onSubmit={(e) => console.log(e, 123)}
                            validationSchema={recoverSchema}
                        />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={3.5} />
        </Grid>
    );
}
