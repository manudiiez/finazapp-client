import styles from '@/styles/components/dataList.module.scss'
import classNames from 'classnames';
const DataList = ({ data }) => {
    return (
        <div className={styles.container}>
            <ul>
                {
                    data.map(item => (
                        <li key={item.name}>
                            <div>
                                <p>{item.name}</p>
                            </div>
                            <p className={classNames(styles.amount, {
                                [styles.bill]: item.type === 'bill'
                            })}>{item.type === 'income' ? '+' : '-'}${item.value}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default DataList