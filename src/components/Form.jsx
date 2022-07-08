import { Button, TextField } from '@mui/material';

export default function Form({ formik, fields }) {
    return (
        <form onSubmit={formik.handleSubmit}>
        {fields.map((field) => (
                <span key={field.id}>
                    <TextField {...field} fullWidth />
                </span>
            ))}

            <Button
                fullWidth
                type='submit'
                variant='contained'
                color='primary'
                sx={{ mt: '1vh' }}
                onClick={()=>console.log(123)}
            >
                Submit
            </Button>
        </form>
    );
}
