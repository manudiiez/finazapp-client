import styles from './join.module.scss'

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