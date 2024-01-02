import styles from '@/styles/components/panelTransactions.module.scss'
import { convertirFormatoFecha } from '@/utils/func';
import classNames from 'classnames';
import Link from 'next/link';
const TransactionsItem = ({ data }) => {
    return (
        <li className={styles.transactionsDay}>
            <p>{convertirFormatoFecha(data.fecha)}</p>
            <ul>
                {
                    data.transactions.map(item => (
                        <li>
                            <Link href="/panel">
                                <div>
                                    <p>{item.category.name}</p>
                                </div>
                                <p className={classNames(styles.amount, { [styles.amountBill]: item.type === 'bill' })}>{item.type === 'bill' ? '-' : '+'}${item.amount}</p>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </li>
    )
}

export default TransactionsItem