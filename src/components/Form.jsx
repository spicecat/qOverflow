import { Button, TextField, Typography } from '@mui/material'

export default function Form({ formik, fields }) {

    return (
        <form onSubmit={formik.handleSubmit}>
            {fields.map(field => (
                <>
                    <Typography>{field.label}</Typography>
                    <TextField {...field} />
                </>
            ))}
            <Button type='submit' variant='contained' color='primary'>Submit</Button>
        </form>
    )
}