
"use client"
import { IconChart, IconPieChart } from '@/components/shared/Icons'
import styles from '@/styles/components/charts.module.scss'
import BarChartComponent from './charts/BarChartComponent'
import PieChartComponent from './charts/PieChartComponent'
import ComposedChartComponent from './charts/ComposedChartComponent'
import { useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import classNames from 'classnames'
import DataList from './DataList'
const ChartContainer = ({ data, type, year }) => {

    const [chartShow, setChartShow] = useState(1);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()


    const handleAddQuery = (name, value) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        const search = current.toString();
        const urlParams = new URLSearchParams(search);
        urlParams.set(name, value);
        const updatedSearch = urlParams.toString();
        const query = updatedSearch ? `?${updatedSearch}` : '';
        router.push(`${pathname}${query}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <button className={classNames({
                        [styles.isActive]: !chartShow
                    })} onClick={() => setChartShow(false)}>
                        <IconPieChart className={styles.IconPieChart} />
                    </button>
                    <button className={classNames({
                        [styles.isActive]: chartShow
                    })} onClick={() => setChartShow(true)}>
                        <IconChart className={styles.IconChart} />
                    </button>
                </div>
                <ul>
                    <li className={classNames({
                        [styles.isActive]: type === 'general'
                    })} onClick={() => handleAddQuery('type', 'general')}>
                        General
                    </li>
                    <li className={classNames({
                        [styles.isActive]: type === 'income'
                    })} onClick={() => handleAddQuery('type', 'income')}>
                        Ingresos
                    </li>
                    <li className={classNames({
                        [styles.isActive]: type === 'bill'
                    })} onClick={() => handleAddQuery('type', 'bill')}>
                        Gastos
                    </li>
                </ul>
            </div>
            <div className={styles.filter}>
                <ul>
                    <li className={classNames({
                        [styles.isActive]: parseInt(year) === new Date().getFullYear()
                    })} onClick={() => handleAddQuery('year', new Date().getFullYear())}>
                        {new Date().getFullYear()}
                    </li>
                    <li className={classNames({
                        [styles.isActive]: parseInt(year) === new Date().getFullYear() - 1
                    })} onClick={() => handleAddQuery('year', new Date().getFullYear() - 1)}>
                        {new Date().getFullYear() - 1}
                    </li>
                    <li className={classNames({
                        [styles.isActive]: parseInt(year) === new Date().getFullYear() - 2
                    })} onClick={() => handleAddQuery('year', new Date().getFullYear() - 2)}>
                        {new Date().getFullYear() - 2}
                    </li>
                    <li className={classNames({
                        [styles.isActive]: parseInt(year) === new Date().getFullYear() - 3
                    })} onClick={() => handleAddQuery('year', new Date().getFullYear() - 3)}>
                        {new Date().getFullYear() - 3}
                    </li>
                </ul>
            </div>
            {
                type !== 'general' ? (
                    <div className={styles.charts}>
                        <div className={classNames(styles.item, {
                            [styles.isActive]: chartShow
                        })}>
                            <BarChartComponent data={data.month} categories={data.categories} />
                        </div>
                        <div className={classNames(styles.item, {
                            [styles.isActive]: !chartShow
                        })}>
                            <PieChartComponent categories={data.categories} />
                        </div>
                    </div>
                ) : (
                    <div className={styles.charts}>
                        <div className={classNames(styles.item, {
                            [styles.isActive]: chartShow
                        })}>
                            <ComposedChartComponent data={data.month} />
                        </div>
                        <div className={classNames(styles.item, {
                            [styles.isActive]: !chartShow
                        })}>
                            <PieChartComponent categories={data.categories} />
                        </div>
                    </div>
                )
            }
            <DataList data={data.categories} />
        </div>
    )
}

export default ChartContainer