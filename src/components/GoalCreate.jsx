"use client"

import { useState } from "react";
import { IconPlus } from "./shared/Icons"
import Modal from "./shared/Modal";
import styles from '@/styles/components/goalCreate.module.scss'
import GoalForm from "./forms/goal/GoalForm";

const GoalCreate = ({ session }) => {

    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <div onClick={() => setModalShow(true)}>
                <IconPlus className={styles.icon} />
            </div>
            <Modal show={modalShow} changeShow={() => setModalShow(!modalShow)} >
                <GoalForm session={session} id={session.user.id} />
            </Modal>
        </div>
    )
}

export default GoalCreate