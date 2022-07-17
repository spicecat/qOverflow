<<<<<<< HEAD
import { Card, CardContent, Paper, Typography } from '@mui/material';
import { AskForm } from '../controllers';
import ReactMarkdown from 'react-markdown';
import { useForm } from '../contexts/FormContext';


=======
import { Card, CardContent } from '@mui/material';
import { AskForm } from 'controllers/FormControllers';
>>>>>>> fb8023fcd79e9e1390e47f3ea4f22a605274b5a4

export default function Ask() {
    
    const {content} = useForm()


   
    
    
    
    

    
    
    return (
        <div>
            <Card>
                <CardContent>
                    <AskForm></AskForm>
                </CardContent>
            </Card>

            <Paper variant = "outlined">
                <Typography variant = "h5"> Text Preview: </Typography>
                <ReactMarkdown children={content}/>
            </Paper>
            
        </div>
        
    );
}
