import { useEffect, useState } from "react";
import styles from '../forms.module.scss'
import { Goal } from "@/api/goal";
import Swal from "sweetalert2";
import Loader from "@/components/shared/Loader";
const GoalForm = ({ initialValues, mode = "create", session, id }) => {

    const goalCtrl = new Goal()

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        amount: initialValues?.amount || '',
        category: initialValues?.category?.name || '',
        color: initialValues?.category?.color || '',
        deadline: initialValues?.deadline || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const createGoal = async () => {
        await goalCtrl.save({ ...values, amount: parseFloat(values.amount), user: id }, session.token)
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        });
        await Toast.fire({
            icon: "success",
            title: `Objetivo creado!!`
        })
        window.location.href = "/panel/goals"
    }

    const updateGoal = async () => {
        await goalCtrl.update({ ...values, amount: parseFloat(values.amount) }, session.token, id)
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        });
        await Toast.fire({
            icon: "success",
            title: `Objetivo editado!!`
        })
        window.location.href = "/panel/goals"
    }

    const deleteGoal = async () => {
        Swal.fire({
            title: `Eliminar Objetivo`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Eliminar",
            denyButtonText: `Cancelar`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true)
                    await goalCtrl.delete(session.token, id)
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    });
                    await Toast.fire({
                        icon: "success",
                        title: `Objetivo editado!!`
                    })
                    window.location.href = "/panel/goals"
                } catch (error) {
                    setLoading(false)
                }
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            if (mode === 'create') {
                await createGoal()
            } else {
                await updateGoal()
            }
        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            await Toast.fire({
                icon: "warning",
                title: `Surgio un error, por favor complete los datos.`
            })
            setLoading(false)
        }
    }


    useEffect(() => {
        if (initialValues) {
            const obj = { ...initialValues, category: initialValues.category.name, color: initialValues.category.color }
            setValues(obj)
        }
    }, [initialValues])

    return (
        <div className={styles.goalForm}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nameGoalInput">Titulo</label>
                    <input type="text" id="nameGoalInput" name="category" onChange={handleChange} value={values?.category} required />
                </div>
                <div>
                    <label htmlFor="colorInput">Color</label>
                    <input type="color" name="color" id="colorInput" onChange={handleChange} value={values?.color} required />
                </div>
                <div>
                    <label htmlFor="amountGoalInput">Suma</label>
                    <input type="number" id="amountGoalInput" name="amount" onChange={handleChange} value={values?.amount} required />
                </div>
                <div>

                    <label htmlFor="inputDate">Fecha</label>
                    <input type="datetime-local" name="deadline" id="inputDate" onChange={handleChange} value={formatDate(values?.deadline)} required />
                </div>
                <button type="submit" disabled={loading}>{loading ? <Loader size="15px" /> : (mode === 'create' ? 'CREAR' : "EDITAR")}</button>
                {
                    mode !== 'create' && (
                        <button type="button" disabled={loading} onClick={deleteGoal}>{loading ? <Loader size="15px" /> : "ELIMINAR"}</button>
                    )
                }

            </form>
        </div>
    )
}

export default GoalForm