
"use client"
import { useState } from "react"
const TransactionForm = () => {
    const [type, setType] = useState(false);
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="category">Categoria</label>
                    <input type="text" name="category" />
                </div>
                <div>
                    <label htmlFor="date">Fecha</label>
                    <input type="text" name="date" />
                </div>
                <div>
                    <label htmlFor="note">Categoria</label>
                    <input type="text" name="note" />
                </div>
            </form>
        </div>
    )
}

export default TransactionForm