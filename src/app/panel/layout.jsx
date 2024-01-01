import Footer from "@/components/Footer"
import styles from './panel.module.scss'
const layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default layout