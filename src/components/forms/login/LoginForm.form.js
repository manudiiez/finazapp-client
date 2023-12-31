import * as Yup from 'yup'

export const initialValues = () => {
    return {
        email: "",
        password: ""
    }
}

export const validationSchema = () => {
    return Yup.object({
        email: Yup.string().required(true),
        password: Yup.string().required(true),
    })
}
