import { Button, TextField, Typography } from '@mui/material';

export default function Form({ formik, fields, handleChange }) {
    return (
        <form onSubmit={formik.handleSubmit} onChange={handleChange}>
            {fields.map((field) => (
                <span key={field.id}>
                    <Typography>{field.title}</Typography>
                    <TextField {...field} fullWidth />
                </span>
            ))}

            <Button fullWidth type='submit' variant='contained' color='primary' sx={{ mt: '1vh' }}>
                Submit
            </Button>
        </form>
    );
}
