import styles from '../join.module.scss'
import Link from 'next/link'
import RegisterForm from '@/components/forms/register/RegisterForm'

const Register = () => {
    return (
        <div className={styles.formContainer}>
            <h1>Registrarse</h1>
            <RegisterForm />
            <span>
                ¿Ya tienes cuenta? <Link href="/join/login">Inciar sesion</Link>
            </span>
        </div>
    )
}

export default Register