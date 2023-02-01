import React from 'react'
import LoginCSS from '../ConnexionLivreurs/LoginCSS.css'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import Footer from '../footer/Footer';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import NavBar from '../navBar/NavBar';
import { Spinner } from 'react-bootstrap';

export default function Login() {
    const [showSpinner, setShowSpinner]=useState(false);
    const [Email, setEmail] = useState();
    const [password, setPassword] = useState()
    const [alerte, setAlerte] = useState(false);
    const [allData, setAllData] = useState([]);
    const [dataConnexion, setDataConnexion] = useState({ Email: "", Password: "" });
    const [messageError, setMessageError] = useState();
    const [messageSuccess, setMessageSuccess] = useState();
    const [alertError, setAlertError] = useState(false);
    const [alertSuccess, setAlerteSuccess] = useState(false);
    const navigate = useNavigate();
    const getAllUsers = () => {
        axios.get('http://localhost:2000/appliv/confirmationProfilLivreur/getconfirmedLivreur').then((res) => setAllData(res.data))
    }
    const checkConnexion = () => {
        if (Email && password) {
            console.log(password);
            setDataConnexion({
                Password: password,
                Email : Email  
            })
            const dataTosend = JSON.stringify(dataConnexion);
            axios.post(`http://localhost:2000/appliv/userLivreur/connexion/`, dataTosend, {
                headers: {
                    'Content-Type': "application/json"
                }
            }).then((res) => {
                if (res.data.messageError === "Adresse mail ou mot de passe incorrecte" && res.data.messageSuccess === "") {
                    setMessageError(res.data.messageError);
                    setAlertError(!alertError)
                }
                if (res.data.messageSuccess === "Connexion réussite" && res.data.messageError === "") {
                    setMessageSuccess(res.data.messageSuccess);
                    setAlertError(false)
                    setAlerteSuccess(!alertSuccess);
                    localStorage.setItem('statut', 'connect');
                    localStorage.setItem('Email', res.data.data);
                    setShowSpinner(true);
                    setTimeout(() => {
                        navigate('/profile');
                    }, 1000)
                }
            })
        }
        else {
            setMessageError("Remplissez tous les champs");
            setAlertError(!alertError)
        }
}

    //  console.log(allData)

    /*
    const submitLogin = () => {
        console.log(allData);
        const result = allData.data.find(elm => elm.Email === email);
        if (!result) {
            setAlerte("Email n'existe pas ou mot de passe incorrecte");
        }
        else {
            navigate('/AccountBusiness');
        }
    }*/
    /*
        useEffect(() => {
            getAllUsers();
        }, []);
    
        useEffect(() => {
            getAllUsers();
        }, [email])
    */
    return (
        <div className='ConnexionClient'>
            <div> <NavBar /> </div>
        
            <div className='connexionTitle'>
                <div> <h1> Espace livreur</h1>  </div>
                <div>  <h3> Connexion </h3>  </div>
            </div>
            <div className='formConnexion'>
               { showSpinner && <div className='spinnerBox'> 
               <div>  
                <Spinner className='spinner' animation="grow" variant="warning" size="lg"/> 
                </div>
                </div>}
            <div className='formContent'>
                    {
                    alertError && <div className='alrtContainer'>
                <div className='alrt'>
                    <Alert severity="error" className='errorAlrt'>{messageError}</Alert>
                </div>
            </div>
        }
        {
            alertSuccess &&
            <div>
                <Alert severity="success" >{messageSuccess}</Alert>
            </div>
        }
            <form>
                <div className='fomItem'>
                    <div className='formItemName'> Email </div>
                    <div> 
                        <input 
                            className='intputFormItem' 
                            type="email" value={Email} 
                            onChange={(e) => {
                            setEmail(e.target.value);
                            setDataConnexion({ Email: e.target.value })}} /> 
                    </div>
              </div>
            <div className='fomItem'>
                <div className='formItemName'> Mot de passe </div>
                <div> 
                    <input 
                        className='intputFormItem' 
                        type="password" value={password} 
                        onChange={(e) => {
                        setPassword(e.target.value);
                        setDataConnexion({ Password: e.target.value, Email:Email })
                    }} /> 
                </div>
            </div>
        </form>
        <div className='pw'> 
            <div> Mot de passe oublié ? </div>
        </div>
        <div className='pw'> 
                <div> Vous ne possedez pas de compte ? 
                    <Link to="/signUpLivreur" className='linkSignupClient'>inscrivez-vous </Link>  
                </div> 
        </div>
        <div className='buttonConnexion' onClick={(e) => checkConnexion(e)}> 
           <div className='button'>  Connexion </div> 
        </div>
     </div>
  </div>

  <div> <Footer /> </div>

          {  /*<h1> Connexion</h1>
            {
                alertError &&
                <div>
                    <Alert severity="error">{messageError}</Alert>
                </div>
            }
            {
                alerteSuccess &&
                <div>
                    <Alert severity="success" >{messageSuccess}</Alert>
                </div>
            }
            <div className='loginContainer'>
                <div className='loginFields'>
                    <label> E-mail </label>
                    <input type="email" value={Email} onChange={(e) => {
                        setEmail(e.target.value);
                        setDataConnexion({ Email: e.target.value })
                    }} />
                </div>
                <div className='loginFields'>
                    <label> Mot de passe</label>
                    <input type="password" value={password} onChange={(e) => {
                        setPassword(e.target.value);
                        setDataConnexion({ Password: e.target.value, Email:Email })
                    }} />
                </div>
                <div>
                    <button onClick={(e) => checkConnexion(e)
                    }> Connexion</button>
                </div>
            </div>
                <div> Vous ne possedez pas de compte ? <Link to="/signUpLivreur" >inscrivez-vous </Link> </div> */}
        </div>
    )
}
