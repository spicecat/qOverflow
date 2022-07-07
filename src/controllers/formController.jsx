import { useFormik } from 'formik'
import { Form } from '../components'

export default function FormController() {
    const formik = useFormik()
    const fields = 1

    return <Form {...{ formik, fields }} />
}