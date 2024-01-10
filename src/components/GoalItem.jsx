"use client"
import styles from '@/styles/components/goalItem.module.scss'
import ProgressBar from "@ramonak/react-progress-bar";
import classNames from 'classnames';
import { DateTime } from 'luxon';

const GoalItem = ({ data, mode = false }) => {
    function calcularPorcentaje(parte, total) {
        return (parte / total) * 100;
    }
    return (
        <div className={classNames(styles.container, {
            [styles.other]: mode
        })}>
            <div className={styles.color} style={{ backgroundColor: data.category.color }}></div>
            <div className={styles.content}>
                <div className={styles.info}>
                    <div>
                        <p>{data.category.name}</p>
                        <span>${data.amount}</span>
                    </div>
                    <div>
                        <span>${data?.sum || 0}</span>
                        <span>Faltan: ${(data?.amount - data?.sum) || data?.amount}</span>
                    </div>
                </div>
                <div>
                    <ProgressBar
                        completed={calcularPorcentaje(data.sum, data.amount) || 0}
                        className={styles.progressBar}
                        barContainerClassName={styles.barContainer}
                        completedClassName={styles.barCompleted}
                        labelClassName={styles.label}
                    />
                </div>
                <div className={styles.date}>{DateTime.fromISO(data.deadline).minus({ days: 1 }).toRelative()}</div>
            </div>

        </div>
    )
}

export default GoalItem