import styles from '@/styles/components/panelTransactions.module.scss'
import { convertirFormatoFecha } from '@/utils/func';
import classNames from 'classnames';
const TransactionsItem = ({ data, openModal }) => {
    return (
        <li className={styles.transactionsDay}>
            <p>{convertirFormatoFecha(data.fecha)}</p>
            <ul>
                {
                    data.transactions.map(item => (
                        <li key={item._id}>
                            <button onClick={() => openModal(item)}>
                                <div>
                                    <p>{item.category.name}</p>
                                </div>
                                <p className={classNames(styles.amount, { [styles.amountBill]: item.type === 'bill' })}>{item.type === 'bill' ? '-' : '+'}${item.amount}</p>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </li>
    )
}

export default TransactionsItem