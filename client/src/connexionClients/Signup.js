import React from 'react'
import '../connexionClients/Signup.css'
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import NavBar from '../navBar/NavBar';
import Footer from '../footer/Footer';
import { set } from 'express/lib/application';
import Form from '../form/Form';
import { Spinner } from 'react-bootstrap';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

export default function Signup() {

    const { i18n, t } = useTranslation(["common"])
    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [adress, setAdress] = useState();
    const [id, setID] = useState(uuidv4());
    const [tel, setTel] = useState();
    const [email, setEmail] = useState();
    const [statut, setStatut] = useState();
    const [password, setPassword] = useState();
    const [confirmationPassword, setConfirmationPassword] = useState();
    const [alerte, setAlerte] = useState(false);
    const [msg, setMsg] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);
    const [msgSuccess, setMsgSuccess] = useState("");
    const [alerteSuccess, setAlerteSuccess] = useState(false)
    const [data, setData] = useState({
        id: id,
        Nom: "",
        Prenom: "",
        Telephone: "",
        Email: "",
        Statut: "",
        Password: ""
    })
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


    const getpassword =(e)=>{
        setPassword(e.target.value)
    }

    const getconfirmedpassword =(e)=>{
        setConfirmationPassword(e.target.value)
    }
    const getStatut = () => {
        const optionsValue = document.querySelector('#sectionStatut');
        setStatut(optionsValue.value);
        setData({
            id: id,
            Nom: nom,
            Prenom: prenom,
            Telephone: tel,
            Email: email,
            Statut: optionsValue.value,
            Password: password,
            Adress: adress
        });
    }



    const submit = (e) => {
        setAlerte(false);
        if (nom && prenom && tel && email && statut && password && confirmationPassword) {
            if (password === confirmationPassword) {

                setData({
                    id: id,
                    Nom: nom,
                    Prenom: prenom,
                    Telephone: "0" + tel,
                    Email: email,
                    Statut: statut,
                    Password: password,
                    Adress: adress
                });

                const dataTosend = JSON.stringify(data);

                axios.post(`http://localhost:2000/appliv/client/signup/`, dataTosend, {
                    headers: {
                        'Content-Type': "application/json"
                    }

                }).then((res) => {

                    if (res.data.messageError === "Adresse mail existe déja" && res.data.messageSuccess === "") {
                        setAlerte(!alerte);
                        setMsg(res.data.messageError);

                        setConfirmationPassword("");
                        setEmail("");
                        console.log(res.data);
                    }

                    if (res.data.messageSuccess === "Inscription réussite" && res.data.messageError === "") {
                        console.log(res)
                        setMsgSuccess(res.data.messageSuccess);
                        setAlerteSuccess(!alerteSuccess);
                        localStorage.setItem('statut', 'connect');
                        localStorage.setItem('Email',  data.Email);
                        navigate('/profile');
                      
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



    const tryUpDate = () => {


        const dataTosendID = JSON.stringify(id);
        axios.put(`http://localhost:2000/appliv/client/upDateNumber/`).then((res) => console.log("all good"));
        console.log(dataTosendID)
    }





    useEffect(() => {
        setData({
            id: id,
            Nom: nom,
            Prenom: prenom,
            Telephone: tel,
            Email: email,
            Statut: statut,
            Password: password,
            Adress: adress
        });

    }, [nom, prenom, adress, email, statut, tel, password])

    return (
        <div className='Signup'>


            <div className='navv'> <NavBar /> </div>

            <div className='signUpTile' id="alertee">

                <div> <h1> {t("espaceclient")}</h1>  </div>
                <div> <h3> {t("inscription")}  </h3></div>
            </div>
            <div className='formContainer'>

                {showSpinner && <div className='spinnerBox'>
                    <div>  <Spinner className='spinner' animation="grow" variant="warning" size="lg" /> </div>
                </div>}
                <div className='formContent'>

                    <div>


{/*
                        {
                            alerteSuccess && <div className='alrtContainer'>
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
                        }*/}

                    </div>


                    <Form 
                    profil={true} name={nom} getName={getname} secondname={prenom} getsecondName={getSecondName} 
                    Adress={adress} getAdress={getadress}  
                    phone={tel} getPhone={getphone} Email={email} getEmail={getemail}
                    password={password}  getPassword={getpassword}
                    confirmedPassword={confirmationPassword} getConfirmedpassword={getconfirmedpassword} 
                    getStatutprofil={getStatut} Submit={submit} Success={alerteSuccess} msgSuccess={msgSuccess} Error={alerte} 
                    msgError={msg} link="#alertee"
                    />








                    {  /*   <form style={{ "marginTop": "20px" }} onSubmit={(e) => e.preventDefault()}>



                        <div className='formItem'>
                            <div className='nameForm'>
                                <div className='formNomination'>  Nom </div>
                                <div> <input className='inputFiled' type="text" value={nom} onChange={(e) => {

                                    setNom(e.target.value)
                                    setData({ Nom: nom })
                                }} /></div>
                            </div>

                            <div className='nameForm'>
                                <div className='formNomination'>  Prénom </div>
                                <div> <input className='inputFiled' type="text" value={prenom} onChange={(e) => {
                                    setPrenom(e.target.value)
                                    setData({ Prenom: prenom })
                                }} /></div>
                            </div>
                        </div>


                        <div className='formItemInfo'>
                            <div className='nameFormInfo'>
                                <div className='formNomination'>  Adresse </div>
                                <div> <input value={adress} className='inputFiledInfo' onChange={(e) => {
                                    setAdress(e.target.value);
                                    setData({ Adress: adress })
                                }} /></div>
                            </div>
                        </div>

                        <div className='formItemInfo'>
                            <div className='nameFormInfo'>
                                <div className='formNomination'>  Téléphone </div>
                                <div> <input className='inputFiledInfo' type="text" onChange={(e) => {
                                    setTel(e.target.value);
                                    setData({ Telephone: tel })
                                }
                                } value={tel} /></div>
                            </div>
                        </div>

                        <div className='formItemInfo'>
                            <div className='nameFormInfo'>
                                <div className='formNomination'>  Email </div>
                                <div> <input className='inputFiledInfo' type="text" value={email} onChange={(e) => {
                                    setEmail(e.target.value);
                                    setData({ Email: email })
                                }} /></div>
                            </div>
                        </div>

                        <div className='formItem password'>
                            <div className='nameForm'>
                                <div className='formNomination'>  Password </div>
                                <div> <input className='inputFiled' type="password" value={password} onChange={(e) => {
                                    setPassword(e.target.value)
                                    setData({ Password: e.target.value, Email: email, Telephone: tel, Prenom: prenom, Statut: statut, Nom: nom, Adress: adress, id: id })
                                }} /></div>
                            </div>

                            <div className='nameForm confirmation'>
                                <div className='formNomination confirmation'>  Confirmer password </div>
                                <div> <input className='inputFiled' type="password" value={confirmationPassword} onChange={(e) => {
                                    setConfirmationPassword(e.target.value);
                                }} /></div>
                            </div>
                        </div>

                        <div className='profilClient'>
                            <div className='profilClientNomination'> Vous êtes :  </div>
                            <div className='selectChoice'>
                                <div>  <select id="sectionStatut" defaultValue={'DEFAULT'} onChange={() => {
                                    getStatut();
                                }} className='selectfieldInfo'>
                                    <option value="DEFAULT" disabled>Choisissez ...</option>
                                    <option id="ptions" selected value=" Un magasin">  Un magasin </option>
                                    <option id="ptions" value="Une entreprise"> Une entreprise </option>
                                    <option id="ptions" value="Un particulier"> Un particulier </option>
                                </select></div>

                            </div>
                        </div>

{                    /*    <div className='buttonContainer'>  <a href='#alertee'> <div className='buttonConnexion' onClick={() => submit()}> <div className='button'> S'inscrire </div></div> </a> </div>
}                    </form> */}

                </div>
            </div>


            <div> <Footer /> </div>

            {/*{
                alerteSuccess && <div>
                    <Alert variant='success'>{msgSuccess}</Alert>
                </div>
            }

            {
                alerte &&
                <div>
                    <Alert severity="error">{msg}</Alert>
                </div>
            }


            <div className='nameFields'>
                <div>
                    <label> Nom</label>
                    <input type="text" className='inputName' value={nom} onChange={(e) => {

setNom(e.target.value)
setData({Nom : nom})

                    } } />
                </div>

                <div>
                    <label> Prénom</label>
                    <input type="text" className='inputName' value={prenom} onChange={(e) => 
                        
                        {
                            setPrenom(e.target.value)
                            setData({Prenom : prenom})

                        }
                        
                       } />
                </div>
            </div>


            <div className='secondRowFields'>
                <div>
                    <label> ID</label>
                    <input type="text" disabled value={id} className='inputSecondField' placeholder={id} />
                </div>



                <div>
                    <label> Téléphone</label>
                    <input type="text" className='inputSecondField' onChange={(e) =>
                        
                        {
                            setTel(e.target.value);
                            setData({Telephone : tel})
                        }
                        } value={tel} />
                </div>



                <div>
                    <label> E-mail</label>
                    <input type="text" className='inputSecondField' value={email} onChange={(e) => {
setEmail(e.target.value);
setData({ Email : email})
                    } } />
                </div>
            </div>



            <div>

                <label> Vous êtes :  </label>
                <select id="sectionStatut" defaultValue={'DEFAULT'} onChange={()=> getStatut()} className='selectfield'>
                    <option value="DEFAULT" disabled>Choisissez  ...</option>
                    <option id="ptions" selected value=" Un magasin">  Un magasin </option>
                    <option id="ptions" value="Une entreprise"> Une entreprise </option>

                </select>

            </div>


<div>
    <label> Mot de passe</label>
    <input type="password" value={password} onChange={(e) => {
setPassword(e.target.value)
setData({Password : e.target.value, Email : email, Telephone : tel, Prenom : prenom,  Statut: statut, Nom : nom, id : id})
    } }/>
</div>

<div>
    <label> Confirmer mot de passe</label>
    <input type="password" value={confirmationPassword} onChange={(e) => {
setConfirmationPassword(e.target.value);

    }}/>
</div>


            <div>
<button onClick={()=> submit()}> S'inscrire </button>
            </div>



<button onClick={() => tryUpDate() }> UPDATE</button> */}

        </div>
    )
}
