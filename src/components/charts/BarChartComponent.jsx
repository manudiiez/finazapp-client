"use client"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './charts.module.scss'
import Message from '../shared/Message';
const response = {
    attributes: [
        {
            name: 'salario',
            color: '#8884d8'
        },
        {
            name: 'inmuebles',
            color: '#62a877'
        },
        {
            name: 'freelance',
            color: '#a87262'
        },
    ],
    data: [
        {
            name: 'Ene',
            salario: 4000,
            inmuebles: 2400,
            freelance: 2400,
        },
        {
            name: 'Feb',
            salario: 3000,
            inmuebles: 1398,
            freelance: 2210,
        },
        {
            name: 'Mar',
            salario: 2000,
            inmuebles: 9800,
            freelance: 2290,
        },
        {
            name: 'Abr',
            salario: 2780,
            inmuebles: 3908,
            freelance: 2000,
        },
        {
            name: 'May',
            salario: 1890,
            inmuebles: 4800,
            freelance: 2181,
        },
        {
            name: 'Jun',
            salario: 2390,
            inmuebles: 3800,
            freelance: 2500,
        },
        {
            name: 'Jul',
            salario: 8490,
        },
    ]
};
const BarChartComponent = ({ data, categories }) => {

    if (data.length === 0) {
        return (
            <div className={styles.container}>
                <Message text="No hay datos" height={100} />
            </div>
        );
    }
    return (
        <div className={styles.container}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={600} height={300} data={data} margin={{ right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    {
                        categories.map(item => (
                            <Bar dataKey={item.name} stackId="a" fill={item.color} key={item.name} />
                        ))
                    }
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className={styles.tooltip}>
                <p>{label}</p>
                {
                    payload.map(item => (
                        <p key={item?.name} style={{ color: item?.color }}>
                            {item?.name}
                            <span style={{ color: item?.color }}> ${item?.value || 0}</span>
                        </p>
                    ))
                }
            </div>
        )
    }
}

export default BarChartComponent