import React from 'react'
import {useLocalStorage} from '../utils/useLocalstorage'
const Customer = () =>  {
    const [name, setName] = useLocalStorage("name", "Bob");
    return (
        <div>
                Customer page name
            <input placeholder="name" onChange={(e) => setName(e.target.value)} />
        </div>
    )
}

export default Customer
