"use client"
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './charts.module.scss'
import Message from '../shared/Message';

const ComposedChartComponent = ({ data }) => {
    // const data = [
    //     {
    //         name: 'Ene',
    //         Ingresos: 4000,
    //         Gastos: 2500,
    //         Balance: 1500,
    //     },
    //     {
    //         name: 'Feb',
    //         Ingresos: 500,
    //         Gastos: 2800,
    //         Balance: -2300,
    //     },
    //     {
    //         name: 'Mar',
    //         Ingresos: 100,
    //         Gastos: 200,
    //         Balance: -100,
    //     },
    //     {
    //         name: 'Abr',
    //         Ingresos: 4500,
    //         Gastos: 1000,
    //         Balance: 3500,
    //     },
    //     {
    //         name: 'May',
    //         Ingresos: 2000,
    //         Gastos: 2000,
    //         Balance: 0,
    //     },
    //     // Agregar más meses con datos de ingresos, gastos y balance
    // ];

    const gradientOffset = () => {
        const dataMax = Math.max(...data.map((i) => i.Balance));
        const dataMin = Math.min(...data.map((i) => i.Balance));

        if (dataMax <= 0) {
            return 0;
        }
        if (dataMin >= 0) {
            return 1;
        }

        return dataMax / (dataMax - dataMin);
    };

    const off = gradientOffset();

    if (data.length === 0) {
        return (
            <div className={styles.container}>
                <Message text="No hay datos" height={100} />

            </div>
        );
    }


    return (
        <div className={styles.container}>
            <ResponsiveContainer width="100%" height={300}>
                <ComposedChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Line type="monotone" dataKey="Ingresos" stroke="#3da5f4 " />
                    <Line type="monotone" dataKey="Gastos" stroke="#ff7b5c" />
                    <defs>
                        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset={off} stopColor="#3A785E" stopOpacity={1} />
                            <stop offset={off} stopColor="#A5211E " stopOpacity={1} />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="Balance"
                        stroke="#ffffff"
                        fill="url(#splitColor)"
                    />
                    <Tooltip content={<CustomTooltip />} />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className={styles.tooltip}>
                <p>{label}</p>
                {
                    payload.map(item => (
                        <p key={item?.name} style={{ color: (item?.name === 'Balance' ? (item?.value < 0 ? 'red' : 'green') : item?.color) }}>
                            {item?.name}
                            <span style={{ color: (item?.name === 'Balance' ? (item?.value < 0 ? 'red' : 'green') : item?.color) }}> ${item?.value || 0}</span>
                        </p>
                    ))
                }
            </div>
        )
    }
}

export default ComposedChartComponent;