import { Button, TextField } from '@mui/material'

export default function Form({ formik, fields }) {

    return (
        <form onSubmit={formik.handleSubmit}>
            {fields.map(field =>
                <TextField {...field} />
            )}
            <Button type="submit">Submit</Button>
        </form>
    )
}