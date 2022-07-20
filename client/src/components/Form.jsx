import React, {useEffect} from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useForm  } from '../contexts/FormContext';

export default function Form({ formik, fields }) {
    const {setContent} = useForm()
    
    useEffect(()=>{
        setContent("")
    }, [])

    

   

    function handleChange(event){

        if(event.target.id === "text"){

            
            setContent(event.target.value)
            
        }
    }
    
    
    
    return (
        <form onSubmit={formik.handleSubmit} onChange={handleChange}>
            {fields.map((field) => (
                <span key={field.id}>
                    <Typography>{field.title}</Typography>
                    <TextField {...field} fullWidth/>
                </span>
            ))}

            <Button
                fullWidth
                type='submit'
                variant='contained'
                color='primary'
                sx={{ mt: '1vh' }}
            >
                Submit
            </Button>
            
        </form>
    );
}
