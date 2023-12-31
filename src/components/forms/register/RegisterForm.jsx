
"use client"
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './RegisterForm.form';
import styles from '../forms.module.scss'
import { User } from '@/api/user';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

const RegisterForm = () => {
    const userCtrl = new User()
    const [loading, setLoading] = useState(false);

    const handleClick = (formValue) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await userCtrl.register(formValue))
            } catch (error) {
                console.log(error);
                reject(error);
            }
        })
    }

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            setLoading(true)
            toast.promise(handleClick(formValue), {
                loading: 'Creando...',
                success: async () => {
                    await signIn("credentials", {
                        email: formValue.email,
                        password: formValue.password,
                        redirect: true,
                        callbackUrl: '/panel'
                    });
                    return "Usuario registrado correctamente!!"
                },
                error: (error) => {
                    return error
                },
            });
            setLoading(false)
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    name="email"
                    type="text"
                    placeholder="Escriba su email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    required
                    error={formik.errors.email}
                />
            </div>
            <div className={styles.formInputsContainer}>
                <div>
                    <label htmlFor="firstname">Nombre</label>
                    <input
                        name="firstname"
                        type="text"
                        required
                        placeholder="Nombre"
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        error={formik.errors.firstname}
                    />
                </div>
                <div>
                    <label htmlFor="lastname">Apellido</label>
                    <input
                        name="lastname"
                        type="text"
                        required
                        placeholder="Apellido"
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        error={formik.errors.lastname}
                    />
                </div>

            </div>
            <div>
                <label htmlFor="password">Contraseña</label>
                <input
                    name="password"
                    type="password"
                    required
                    placeholder="Contraseña"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                />
            </div>
            <button type="submit" disabled={loading} >Crear</button>
        </form>
    )
}

export default RegisterForm