import React from 'react'
import {useLocalStorage} from '../utils/useLocalstorage'
import {TableCustomer} from '../components/customer'
const Customer = () =>  {
    // const [name, setName] = useLocalStorage("name", "Bob");
    return (
        <div>
            <TableCustomer />
        </div>
    )
}

export default Customer
