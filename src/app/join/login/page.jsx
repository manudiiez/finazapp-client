import Link from 'next/link';
import LoginForm from '@/components/forms/login/LoginForm';
import styles from '../join.module.scss'

const Login = () => {
    return (
        <div className={styles.formContainer}>
            <h1>Iniciar sesion</h1>
            <LoginForm />
            <span>
                ¿Eres Nuevo? <Link href="/join/register">Regístrarse Ahora</Link>
            </span>
        </div>
    )
}

export default Login