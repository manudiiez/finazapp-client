"use client"
import GoalItem from '@/components/GoalItem'
import GoalForm from '@/components/forms/goal/GoalForm'
import Message from '@/components/shared/Message'
import Modal from '@/components/shared/Modal'
import React, { useState } from 'react'
import styles from '@/styles/components/goalList.module.scss'
const GoalList = ({ data, session }) => {

    const [modalShow, setModalShow] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);

    const handleClickItem = (item) => {
        setItemSelected(item)
        setModalShow(true)
    }

    return (
        <div className={styles.container}>
            {
                data.length === 0 ? (
                    <Message text="No hay objetivos" height={100} />
                ) : (
                    <ul>
                        {
                            data.map(item => (
                                <li key={item._id} onClick={() => handleClickItem(item)}>
                                    <GoalItem data={item} />
                                </li>
                            ))
                        }
                    </ul>

                )
            }
            <Modal show={modalShow} changeShow={() => setModalShow(!modalShow)}>
                {
                    itemSelected !== null && (
                        <GoalForm initialValues={itemSelected} mode='update' session={session} id={itemSelected._id} />
                    )
                }
            </Modal>
        </div>
    )
}

export default GoalList