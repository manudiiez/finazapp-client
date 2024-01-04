"use client"
import React, { useEffect, useState } from 'react'
const Settings = () => {

    const [category, setCategory] = useState();

    useEffect(() => {
        console.log(category);
    }, [category])

    return (
        <div>
            hola
            {/* <CategoryInput category={category} setCategory={setCategory} /> */}
        </div>
    )
}
export default Settings