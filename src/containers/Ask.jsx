import { Card, CardContent, Paper, Typography } from '@mui/material';
import { AskForm } from '../controllers/FormControllers';
import ReactMarkdown from 'react-markdown';
import { useForm } from '../contexts';
import {MdPreview} from 'components'



export default function Ask() {
    
    
    const {content} = useForm()


   
    
    
    
    

    
    
    return (
        <div>
            <Card>
                <CardContent>
                    <AskForm></AskForm>
                    <MdPreview/>
                </CardContent>
                
            </Card>
            
            
            
        </div>
        
    );
}
