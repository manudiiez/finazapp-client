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
                                <div style={{ backgroundColor: item.color }}></div>
                                <p style={{ color: item.color }}>{item.name}</p>
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