import { Card, CardContent } from '@mui/material';
import { AskForm } from '../controllers';

export default function Ask() {
    return (
        <Card>
            <CardContent>
                <AskForm />
            </CardContent>
        </Card>
    );
}
