import styles from '@/styles/components/loader.module.scss'
const Loader = ({ size }) => {
    return (
        <div className={styles.loader} style={{ fontSize: size }}></div>
    )
}

export default Loader