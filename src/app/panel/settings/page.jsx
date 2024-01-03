"use client"
import CategoryInput from '@/components/categoryInput'
import React, { useEffect, useState } from 'react'
const Settings = () => {

    const [category, setCategory] = useState();

    useEffect(() => {
        console.log(category);
    }, [category])

    return (
        <div>
            <CategoryInput category={category} setCategory={setCategory} />
        </div>
    )
}
export default Settings