import { Category } from '@/api/category'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import TransactionForm from '@/components/forms/transaction/TransactionForm'
import { getServerSession } from 'next-auth';
import React from 'react'

const NewTransaction = async () => {
    const session = await getServerSession(authOptions);
    const categoryCtrl = new Category()
    const categories = await categoryCtrl.getAll(session.token)
    return (
        <div>
            <TransactionForm categories={categories} />
        </div>
    )
}

export default NewTransaction