"use client"
import { useState } from "react";
import TransactionsItem from "./TransactionsItem"
import Modal from "../shared/Modal";
import TransactionForm from "../forms/transaction/TransactionForm";

const Transactions = ({ data, categories, user }) => {
    const [transactions, setTransactions] = useState(data);
    const [itemSelected, setItemSelected] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    const openModal = (item) => {
        setItemSelected(item)
        setModalShow(true)
    }

    return (
        <div>
            <h3>Transacciones</h3>
            <ul>
                {
                    transactions.map(item => (
                        <TransactionsItem data={item} key={item.fecha} openModal={openModal} />
                    ))
                }
            </ul>
            <Modal show={modalShow} changeShow={() => setModalShow(!modalShow)}>
                {
                    itemSelected !== null && (
                        <TransactionForm categories={categories} initialValues={itemSelected} mode='update' session={user} id={itemSelected._id} />
                    )
                }
            </Modal>
        </div>
    )
}

export default Transactions