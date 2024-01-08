"use client"
import { AreaChart, Area, ResponsiveContainer, YAxis, XAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import styles from './charts.module.scss'
const productSales = [
    { name: 'Ene', product1: 1500, product2: 2800 },
    { name: 'Feb', product1: 5200, product2: 2900 },
    { name: 'Mar', product1: 1700, product2: 3100 },
    { name: 'Abr', product1: 30, product2: 2600 },
    { name: 'May', product1: 2800, product2: 3300 },
    { name: 'Jun', product1: 2600, product2: 3000 },
    { name: 'Jul', product1: 2900, product2: 2700 },
    { name: 'Ago', product1: 1100, product2: 3200 },
    { name: 'Sep', product1: 3300, product2: 2900 },
    { name: 'Oct', product1: 2800, product2: 2500 },
    { name: 'Nov', product1: 3000, product2: 2800 },
    { name: 'Dic', product1: 3200, product2: 2700 }
];

const AreaChartComponent = () => {
    return (
        <div className={styles.container}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart width={500} height={300} data={productSales} margin={{ right: 30 }}>
                    <YAxis />
                    <XAxis dataKey="name" />
                    <CartesianGrid strokeDasharray="5 5" />

                    <Tooltip content={<CustomTooltip />} />
                    <Legend />

                    <Area
                        dataKey="product1"
                        type="monotone"
                        stroke="#7c3aed"
                        fill="#9765ec"
                        stackId="1"
                    />
                    <Area
                        dataKey="product2"
                        type="monotone"
                        stroke="#ed3a3a"
                        fill="#ec6565"
                        stackId="1"
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
                    Product1:
                    <span> ${payload[0].value}</span>
                </p>
                <p>
                    Product2:
                    <span> ${payload[1].value}</span>
                </p>
            </div>
        )
    }
}

export default AreaChartComponent
