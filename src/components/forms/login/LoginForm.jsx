"use client"
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './LoginForm.form';
import styles from '../forms.module.scss'
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Loader from '@/components/shared/Loader';

const LoginForm = () => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                setLoading(true)
                await signIn("credentials", {
                    ...formValue,
                    redirect: true,
                    callbackUrl: '/',
                });
            } catch (error) {
            }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    name="email"
                    type="text"
                    value={formik.values.email}
                    required
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                />
            </div>
            <div>
                <label htmlFor="password">Contraseña</label>
                <input
                    name="password"
                    type="password"
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                />
            </div>
            <button type="submit" disabled={loading}>{loading ? <Loader size="15px" /> : 'Ingresar'}</button>
        </form>
    )
}

export default LoginForm