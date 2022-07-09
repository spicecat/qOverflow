import { Card, CardContent } from '@mui/material';
import { AskController } from '../controllers';

export default function Ask() {
    return (
        <Card>
            <CardContent>
                <AskController />
            </CardContent>
        </Card>
    );
}
