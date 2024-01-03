import Footer from "@/components/Footer"
import styles from './panel.module.scss'
const layout = (props) => {
    return (
        <div className={styles.container}>
            <main>
                {props.children}
            </main>
            {props.modal}
            <Footer />
        </div>
    )
}

export default layout