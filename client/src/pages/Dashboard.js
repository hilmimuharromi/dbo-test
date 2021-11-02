import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'

function Dashboard() {
    const history = useHistory()
    const user = localStorage.getItem('user')

    useEffect(() => {
        if(!user) {
            history.push('/login')
        }
        
    }, [user])
    return (
        <div>
            Dashboard d
        </div>
    )
}

export default Dashboard
