import styles from './join.module.scss'

export const metadata = {
    title: "Accede a FinazApp - Tu Compañero para el Control de Gastos e Ingresos",
    description: "Accede a tu cuenta en FinazApp. Administra tus finanzas de manera fácil y segura. ¡Tu camino hacia una gestión financiera más inteligente comienza aquí!",
}
const layout = ({ children }) => {
    return (
        <section className={styles.layout}>
            <div className={styles.content}>
                {children}
            </div>
        </section>
    )
}

export default layout