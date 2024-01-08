import { Transaction } from '@/api/transaction'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ChartContainer from '@/components/ChartContainer'
const Charts = async ({ searchParams }) => {
    const session = await getServerSession(authOptions);
    const { type = "general", year = new Date().getFullYear() } = searchParams
    const transactionCtrl = new Transaction()
    const response = await transactionCtrl.getCharts(type, year, session.token)
    return (
        <ChartContainer data={response} type={type} year={year} />
    )
}

export default Charts