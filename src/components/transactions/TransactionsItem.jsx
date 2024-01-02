import styles from '@/styles/components/panelTransactions.module.scss'
const TransactionsItem = ({ data }) => {
    console.log(data);
    return (
        <li className={styles.transactionsDay}>TransactionsItem</li>
    )
}

export default TransactionsItem