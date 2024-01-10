import styles from '@/styles/components/message.module.scss'

const Message = ({ text, height = '100%' }) => {
    return (
        <div className={styles.container} style={{ height: height }}>
            {text}
        </div>
    )
}

export default Message