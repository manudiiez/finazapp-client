"use client"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import styles from './charts.module.scss'

const data = [
    {
        name: 'Ene',
        ingresos: 4000,
        gastos: 2500,
        balance: 1500,
    },
    {
        name: 'Feb',
        ingresos: 500,
        gastos: 2800,
        balance: -2300,
    },
    {
        name: 'Mar',
        ingresos: 100,
        gastos: 200,
        balance: -100,
    },
    {
        name: 'Abr',
        ingresos: 4500,
        gastos: 1000,
        balance: 3500,
    },
    {
        name: 'May',
        ingresos: 2000,
        gastos: 2000,
        balance: 0,
    },
    // Agregar más meses con datos de ingresos, gastos y balance
];
const AreaChartComponent = () => {
    return (
        <div className={styles.container}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart width={500} height={300} data={data} margin={{ right: 30 }}>
                    <YAxis />
                    <XAxis dataKey="name" />
                    <CartesianGrid strokeDasharray="5 5" />

                    <Tooltip content={<CustomTooltip />} />
                    <Legend />

                    <Area
                        dataKey="ingresos"
                        type="monotone"
                        stroke="#3da5f4"
                        fill="#3da5f4"
                    />
                    <Area
                        dataKey="gastos"
                        type="monotone"
                        stroke="#ff7b5c"
                        fill="#ff7b5c"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className={styles.tooltip}>
                <p>{label}</p>
                <p>
                    {payload[0].name}
                    <span> ${payload[0].value}</span>
                </p>
                <p>
                    {payload[1].name}
                    <span> ${payload[1].value}</span>
                </p>
            </div>
        )
    }
}

export default AreaChartComponent