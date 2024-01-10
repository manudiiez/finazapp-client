"use client"
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';
import styles from './charts.module.scss'
import Message from '../shared/Message';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


const PieChartComponent = ({ categories }) => {
    const allZero = categories.every(transaction => transaction.value === 0);

    if (categories.length === 0 || allZero) {
        return (
            <div className={styles.container}>
                <Message text="No hay datos" />

            </div>
        );
    }

    return (
        <div className={styles.container}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={300}>
                    <Pie
                        data={categories}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={100}
                        fill="#8884d8"
                        labelLine={false}
                        label={renderCustomizedLabel}
                    >
                        {categories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className={styles.tooltip}>
                <p style={{ color: payload[0]?.payload.color }}>
                    {payload[0].name}
                    <span style={{ color: payload[0]?.payload.color }}> ${payload[0].value}</span>
                </p>
            </div>
        )
    }
}

export default PieChartComponent