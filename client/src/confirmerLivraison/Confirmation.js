import React from 'react'
import '../confirmerLivraison/Confirmation.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Confirmation(props) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

/*
    const getInfo = () => {
        axios.get('http://localhost:2000/appliv/verified/:id/:idClient/:todayDate/:timer/:current_minutes/:current_hours').then((res) => console.log(res));
    }
*/
    useEffect(() => {
     
    }, []);

    return (
        <div className='confirmation'>

            <h1> Voici les informations du client </h1>
            <div> </div>
        </div>
    )
}
