import React from 'react'
import '../connexionClients/ConnexionClient.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import Footer from '../footer/Footer';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
export default function ConnexionClient() {
    const { i18n, t } = useTranslation(["common"]);
    const clientId = '1009943674712-bhoq1eicapbig2fg4fvanb9o4qpeboea.apps.googleusercontent.com';
    const [ profile, setProfile ] = useState([]);
    const [dataPw, setDataPw] = useState({
        Email: ""
    })
    const [showSpinner, setShowSpinner] = useState(false);
    const [alertSuccesspw, setAlertSuccesspw] = useState(false);
    const [msgSendPw, setMsgSendPw] = useState("")
    const [alertErrorpw, setAlertErrorpw] = useState(false)
    const [emailRecup, setEmailRecup] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [alertError, setAlertError] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [messageError, setMessageError] = useState();
    const [issignedIn, setIssignedin] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState();
    const [dataConnexionClient, setDataConnexionClient] = useState({
        Email: "",
        Password: ""
    })
    const navigate = useNavigate();
    const onSuccess = (res) => {
        setProfile(res.profileObj);
        submitGoogle(res.profileObj.email)
    };
    const onFailure = (err) => {
        console.log('failed', err);
    };
    const logOut = () => {
        setProfile(null);
    };
const submitGoogle = (user) => {
    const Email = JSON.stringify({Email : user});
    axios.post(`http://localhost:2000/appliv/client/googlesignin/`, Email, {
        headers: {
            'Content-Type': "application/json"
        }
    }).then ((res)=> {
        console.log(res.data)
        if ((res.data.messageError === "Adresse mail ou mot de passe incorrecte" && res.data.messageSuccess === "") || res.data.messageError === "Veuillez vos inscrirre") {
            setMessageError(res.data.messageError);
            setAlertError(true)
            setIssignedin(false)
        }
        if (res.data.messageSuccess === "Connexion réussite" && res.data.messageError === "") {
            setMessageSuccess(res.data.messageSuccess);
            console.log(res.data.data.Email);
            setAlertError(false)
            setAlertSuccess(!alertSuccess,);
            localStorage.setItem('statut', 'connect');
            localStorage.setItem('Email', user);
            setIssignedin(true);
            navigate('/profile');
        }
    })
}
    const submit = () => {
        if (email && password)  {
            const dataTosend = JSON.stringify(dataConnexionClient);
            axios.post(`http://localhost:2000/appliv/client/connexion/`, dataTosend, {
                headers: {
                    'Content-Type': "application/json"
                }
            }).then((res) => {
                console.log(res.data)
                if ((res.data.messageError === "Adresse mail ou mot de passe incorrecte" && res.data.messageSuccess === "") || res.data.messageError === "Veuillez vos inscrirre") {
                    setMessageError(res.data.messageError);
                    setAlertError(true)
                }
                if (res.data.messageSuccess === "Connexion réussite" && res.data.messageError === "") {
                    setMessageSuccess(res.data.messageSuccess);
                    console.log(res.data.data.Email);
                    setAlertError(false)
                    setAlertSuccess(!alertSuccess,);
                    localStorage.setItem('statut', 'connect');
                    localStorage.setItem('Email', res.data.data.Email);
                    setShowSpinner(true);
                    setTimeout(() => {
                        navigate('/profile');
                        setShowSpinner(false);
                    }, 1000)
                }
            })
        }
        else {
            setMessageError("Remplissez tous les champs");
            setAlertError(!alertError)
        }
    }
    
    const getPassword = () => {
        console.log(emailRecup)
        if (emailRecup) {
            const datapw = JSON.stringify(dataPw);
            axios.post('http://localhost:2000/appliv/client/password/', datapw, {
                headers: {
                    'Content-Type': "application/json"
                }
            }).then((res) => {
                if (res.data.message === "Mot de passe envoyé, vérifiez votre boite mail") {
                    setAlertSuccesspw(true);
                    setMsgSendPw(res.data.message);
                }
                else {
                    setAlertErrorpw(true);
                    setMsgSendPw(res.data.message);
                }

            });
        }
        else {
            console.log("inscrivez-vous")
        }
    }
    
    //console.log(dataConnexionClient)
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    return (
        <div className='ConnexionClient'>
            <div> <NavBar /> </div>

            <div className='connexionTitle'>
                <div> <h1> {t("espaceclient")} </h1>  </div>
                <div>  <h3> {t("connexion")}  </h3>  </div>
            </div>

            <div className='formConnexion'>
                {showSpinner && <div className='spinnerBox'>
                    <div>   <Spinner className='spinner' animation="grow" variant="warning" size="lg" /> </div>
            </div>}
            <div className='formContent'>
                    {
                        alertError && <div className='alrtContainer'>
                            <div className='alrt'>
                                <Alert severity="error" className='errorAlrt'> {messageError} </Alert>
                            </div>
                        </div>
                    }
                    {
                        alertSuccess &&
                        <div>
                            <Alert severity="success" >{messageSuccess}</Alert>
                        </div>
                    }
                    <div>
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Sign in with Google"
                     onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={issignedIn}
                        />
                    </div>

                    <form>
                        <div className='fomItem'>
                            <div className='formItemName'> {t("email")}  </div>
                            <div> 
                                  <input 
                                       className='intputFormItem' 
                                       type="email" 
                                       value={email} 
                                       onChange={(e) => {setEmail(e.target.value);
                                       setDataConnexionClient({ Email: e.target.value })}} /> 
                            </div>
                        </div>
                        <div className='fomItem'>
                            <div className='formItemName'> {t("motdepass")} </div>
                            <div> 
                                 <input 
                                     className='intputFormItem' 
                                     type="password" 
                                     value={password} 
                                     onChange={(e) => {setPassword(e.target.value);
                                     setDataConnexionClient({ Password: e.target.value, Email: email })}} /> 
                            </div>
                       </div>
                    </form>
                    <div className='pw'> <div className='motpass' onClick={() => setModalShow(true)}> {t("motdepassoublier")}   </div></div>
                    <div className='pw'> <div> {t("pasdecompte")}  <Link to="/signupClient" className='linkSignupClient'> {t("inscrivezvous")}   </Link>  </div> </div>
                    <div className='buttonConnexion' onClick={() => submit()}> <div className='button'>  {t("connexion")} </div></div>
                </div>
            </div>

            <div className='footerSection'> <Footer /> </div>
            {  /* <form onSubmit={(e) => e.preventDefault()}>
                <div className='loginFields'>
                    <label> E-mail </label>
                    <input type="email" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                        setDataConnexionClient({ Email: e.target.value })
                    }} />
                </div>
                <div className='loginFields'>
                    <label> Mot de passe </label>
                    <input type="password" value={password} onChange={(e) => {
                        setPassword(e.target.value);
                        setDataConnexionClient({ Password: e.target.value, Email: email })
                    }} />
                </div>
            </form>

            <div>
                <button className='submitButton' onClick={() => submit()}> Connexion</button>
            </div>
            <div className='inscription'> Vous ne possedez pas de compte ? <Link to="/signupClient" >inscrivez-vous </Link> </div>
                */}

            <Modal

                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalShow}
            >
                <Modal.Header className='modalHeader'>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Récupération de votre mot de passe
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {alertSuccesspw && <div> <Alert severity="success" >{msgSendPw}</Alert> </div>}
                    {alertErrorpw && <div> <Alert severity="error" > {msgSendPw} </Alert> </div>}
                    <div className='entrerEmail'> Entrer votre adresse mail </div>
                    <div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input className='inputEmail' placeholder='@mail' type="email" value={emailRecup} onChange={(e) => { setDataPw({ Email: e.target.value }); setEmailRecup(e.target.value) }} />
                            <button className='boutonEnvoyer' onClick={() => getPassword()}> Envoyer </button>
                        </form>
                    </div>
                    <div className='note'> Vous recevrez votre mot de passe par mail dans quelques instants !</div>

                </Modal.Body>
                <Modal.Footer className='modalFooter'>
                    <Button className='boutonFermer' onClick={() => setModalShow(false)}>Fermer</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}
