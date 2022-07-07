import { Button, TextField, Typography } from '@mui/material'

export default function Form({ formik, fields }) {

    return (
        <form onSubmit={formik.handleSubmit}>
            {fields.map(field => (
                <span key={field.id}>
                    <Typography>{field.title}</Typography>
                    <TextField {...field} />
                </span>
            ))}
            <br />
            <br />
            <Button fullWidth type='submit' variant='contained' color='primary'>Submit</Button>
        </form>
    )
}