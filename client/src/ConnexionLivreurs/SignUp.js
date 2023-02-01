import React from 'react'
import SignUpCSS from '../ConnexionLivreurs/SignUpCSS.css'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import Footer from '../footer/Footer';
import Form from '../form/Form'
import Wilaya from '../dz.json'
import { Spinner } from 'react-bootstrap';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

export default function SignUp() {
    const { i18n, t } = useTranslation(["common"])
    const [showSpinner, setShowSpinner] = useState(false);
    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [id, setID] = useState(uuidv4());
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [wilaya, setWilaya] = useState("");
    const [commune, setCommune] = useState("Commune1");
    const [adress, setAdress] = useState("");
    const [vehicule, setVehicule] = useState();
    const [matricule, setMatricule] = useState("9675");
    const [permis, setPermis] = useState("HFKR");
    const [cartegrise, setCartegrise] = useState("fhtf");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [alerte, setAlerte] = useState(false);
    const [msg, setMsg] = useState("");
    const [msgSuccess, setMsgSuccess] = useState("");
    const [alerteSuccess, setAlerteSuccess] = useState(false)
    const [data, setData] = useState({})
    const navigate = useNavigate();
    const getname = (e) => {
        setNom(e.target.value)
    }
    const getSecondName = (e) => {
        setPrenom(e.target.value)
    }
    const getadress = (e) => {
        setAdress(e.target.value)
    }
    const getphone = (e) => {
        setTel(e.target.value)
    }
    const getemail = (e) => {
        setEmail(e.target.value)
    }
    const getpassword = (e) => {
        setPassword(e.target.value)
    }
    const getconfirmedpassword = (e) => {
        setConfirmationPassword(e.target.value)
    }
    const getWilaya = () => {
        const optionsValue = document.querySelector('#sectionStatut');
        setWilaya(optionsValue.value);
        setData({
            Password: password, Email: email, Telephone: tel, Prenom: prenom, Nom: nom, id: id, Wilaya: optionsValue.value,
            Commune: commune,
            Adresse: adress,
            Vehicule: vehicule,
            Matricule: matricule,
            Permis: permis,
            Cartegrise: cartegrise
        })
    }
    const getCommune = () => {
        const optionsValue = document.querySelector('#sectionCommune');
        setCommune(optionsValue.value);
    }
    const uploadHandlerPermis = (e) => {
        const dataa = new FormData();
        dataa.append('file', e.target.files[0]);
        /* axios.post('/upload', dataa).then((res) => setFile({ photo : [res.dataa]}));*/
        setPermis(e.target.files[0].name);
    }
    const uploadHandlerCarteG = (e) => {
        const dataa = new FormData();
        dataa.append('file', e.target.files[0]);
        /* axios.post('/upload', dataa).then((res) => setFile({ photo : [res.dataa]}));*/
        setCartegrise(e.target.files[0].name);
    }
    const vehiculeName = () => {
     const doc = document.getElementById('sectionVehicule');
        setVehicule(doc.value);
        setData({
            Password: password, Email: email, Telephone: "0"+ tel, Prenom: prenom, Nom: nom, id: id, Wilaya: wilaya,
            Commune: commune,
            Adresse: adress,
            Vehicule: doc,
            Matricule: matricule,
            Permis: permis,
            Cartegrise: cartegrise
        });
    }
    const submit = () => {
        console.log(email)
        setAlerte(false);
        setData({
            Password: password, Email: email, Telephone: tel, Prenom: prenom, Nom: nom, id: id, Wilaya: wilaya,
            Commune: commune,
            Adresse: adress,
            Vehicule: vehicule,
            Matricule: matricule,
            Permis: permis,
            Cartegrise: cartegrise
        })
        if (nom && prenom && tel && email && wilaya && adress && vehicule && password && confirmationPassword) {
            if (password === confirmationPassword) {
                const dataTosend = JSON.stringify(data);
                axios.post(`http://localhost:2000/appliv/userLivreur/signup`, dataTosend, {
                    headers: {
                        'Content-Type': "application/json"
                    }
                }).then((res) => {

                    if (res.data.messageError === "Adresse mail existe déja" && res.data.messageSuccess === "") {
                        setAlerte(!alerte);
                        setMsg(res.data.messageError);
                        setEmail("");
                        console.log(res.data);
                    }
                    if (res.data.messageSuccess === "Inscription réussite" && res.data.messageError === "") {
                        setMsgSuccess(res.data.messageSuccess);
                        setAlerteSuccess(!alerteSuccess);
                        localStorage.setItem('statut', 'connect');
                        localStorage.setItem('Email', res.data.data);
                        setShowSpinner(true);
                        navigate('/Merci');
                      /*  setTimeout(() => {
                            navigate('/Merci');
                        }, 2000);*/
                    }
                }
                );
            }
            else {
                setAlerte(!alerte);
                setMsg("Mots de passe non identiques")
            }
        }
        else {
            setAlerte(!alerte);
            setMsg("Remplissez tous les champs")
        }
    }
    return (

        <div className='SignUp'>
            <div className='navv'> <NavBar /> </div>
            <div className='signUpTile' id="alertSignIn">
                <div> <h1> {t("espacelivreur")}   </h1>  </div>
                <div> <h3>   {t("inscription")}   </h3></div>
            </div>
            <div className='formContainer'>
                {showSpinner && <div className='spinnerBox'>
                    <div>  <Spinner className='spinner' animation="grow" variant="warning" size="lg" /> </div>
                </div>}
                <div className='formContent'>
                    <div>
                        {
                            alerteSuccess && <div className='alrtContainer' >
                                <div className='alrt'>
                                    <Alert severity="success" className='errorAlrt'>{msgSuccess}</Alert>
                                </div>
                            </div>
                        }

                        {
                            alerte && <div className='alrtContainer'>
                                <div className='alrt'>
                                    <Alert severity="error" className='errorAlrt'>{msg}</Alert>
                                </div>
                            </div>

                        }

                    </div>
                    <Form
                        profil={false} wilaya={true} vehicule={true} name={nom} getName={getname} secondname={prenom} getsecondName={getSecondName}
                        Adress={adress} getAdress={getadress}
                        phone={tel} getPhone={getphone} Email={email} getEmail={getemail}
                        password={password} getPassword={getpassword}
                        confirmedPassword={confirmationPassword} getConfirmedpassword={getconfirmedpassword}
                        getvehicule={vehiculeName} getWilaya={getWilaya} Submit={submit}
                    />
                </div>
            </div>

            <div> <Footer /> </div>
        </div>
    )
}
