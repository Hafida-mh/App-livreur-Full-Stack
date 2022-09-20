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
        }) 
       
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

                        setTimeout(() => {
                            navigate('/Merci');
                        }, 2000);
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

    console.log(data)

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



                    { /*
        <form style={{"marginTop" : "20px"}} onSubmit={(e) => e.preventDefault() }>

  

            <div className='formItem'>
                <div className='nameForm'>
                    <div className='formNomination'>  Nom </div>
                    <div> <input className='inputFiled'  type="text"  value={nom} onChange={(e) => setNom(e.target.value)} /></div>
                </div>

                <div className='nameForm'>
                    <div className='formNomination'>  Prénom </div>
                    <div> <input className='inputFiled' type="text"  value={prenom} onChange={(e) => setPrenom(e.target.value)}/></div>
                </div>
            </div>


            <div className='formItemInfo'>
                <div className='nameFormInfo'>
                    <div className='formNomination'>  Adresse </div>
                    <div> <input className='inputFiledInfo'  type="text"  value={adress} onChange={(e) => setAdress(e.target.value)}/></div>
                </div>
            </div>

            <div className='formItemInfo'>
                <div className='nameFormInfo'>
                    <div className='formNomination'>  Téléphone </div>
                    <div> <input className='inputFiledInfo' type="text"  onChange={(e) => setTel(e.target.value)} value={tel}/></div>
                </div>
            </div>

            <div className='formItemInfo'>
                <div className='nameFormInfo'>
                    <div className='formNomination'>  Email </div>
                    <div> <input className='inputFiledInfo'  type="text" value={email} onChange={(e) => setEmail(e.target.value)}/></div>
                </div>
            </div>

            <div className='formItem password'>
                <div className='nameForm'>
                    <div className='formNomination'>  Password </div>
                    <div> <input className='inputFiled' value={password} type="password" onChange={(e) => 
                            
                            {
                                setPassword(e.target.value);
                                setData({Password : e.target.value, Email : email, Telephone : tel, Prenom : prenom, Nom : nom, id : id, Wilaya: wilaya,
                                    Commune: commune,
                                    Adresse: adress,
                                    Vehicule: vehicule,
                                    Matricule: matricule,
                                    Permis: permis,
                                    Cartegrise: cartegrise})

                            }
                            }/></div>
                </div>

                <div className='nameForm confirmation'>
                    <div className='formNomination confirmation'>  Confirmer password </div>
                    <div> <input className='inputFiled' value={confirmationPassword} type="password" onChange={(e) => setConfirmationPassword(e.target.value)}/></div>
                </div>
            </div>

            <div className='profilClient'> 
            <div className='profilClientNomination'> Votre wilaya  :  </div>
            <div className='selectChoice'> 
            <div>  <select id="sectionStatut"   defaultValue={'DEFAULT'} onChange={()=> {getWilaya()}} className='selectfieldInfo'>
                            <option value="DEFAULT" disabled> Choisissez votre wilaya </option>
                        {Wilaya.map((elm) => {
                            return(
                                <option id="ptions" selected value={elm.city}>  {elm.city} </option>
                            )
                        })}
                        </select></div>
            
            </div>
            </div>

            <div className='profilClient'> 
            <div className='profilClientNomination'> Votre véhicule :  </div>
            <div className='selectChoice'> 
            <div>  <select id="sectionVehicule"   defaultValue={'DEFAULT'} onChange={() => vehiculeName()} className='selectfieldInfo'>
                            <option value="DEFAULT" disabled> Choisissez votre véhicule </option>
                            <option id="ptions" selected value="Moto">  Moto </option>
                            <option id="ptions" value="Voiture"> Voiture</option>
                            <option id="ptions" value="Fourgon">  Fourgon </option>
                          
                        </select></div>
            
            </div>
            </div>

           <div className='buttonContainer'> <a href='#alertSignIn'>  <div className='buttonConnexion' onClick={() => submit()}> <div className='button'> S'inscrire </div></div> </a> </div> 
        </form> */}



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



            { /*
           
           
           
           {
                alerteSuccess && <div>
                    <Alert variant='success'>{msgSuccess}</Alert>
                </div>
            }

            {
                alerte &&
                <div>
                    <Alert severity="error"></Alert>
                </div>
            }
           
           
           <div className='signUpContainer'>
                <div className='nameFields'>
                    <div>
                        <label> Nom</label>
                        <input type="text" className='inputName' value={nom} onChange={(e) => setNom(e.target.value)} />
                    </div>

                    <div>
                        <label> Prénom</label>
                        <input type="text" className='inputName' value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                    </div>
                </div>

                <div className='secondRowFields'>
                    <div>
                        <label> ID</label>
                        <input type="text" disabled value={id} className='inputSecondField' placeholder={id} />
                    </div>



                    <div>
                        <label> Téléphone</label>
                        <input type="text" className='inputSecondField' onChange={(e) => setTel(e.target.value)} value={tel} />
                    </div>



                    <div>
                        <label> E-mail</label>
                        <input type="text" className='inputSecondField' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>






                <div className='localisationFields'>
                    <div>
                        <label> Wilaya </label>
                        <select id="sectionWilaya" defaultValue={'DEFAULT'} onChange={getWilaya} className='selectfield'>
                            <option value="DEFAULT" disabled>Choose a salutation ...</option>
                            <option id="ptions" selected value="Alger">  Alger </option>
                            <option id="ptions" value="Blida"> Blida</option>
                            <option id="ptions" value="Tizi">  Tizi </option>
                            <option id="ptions" value="Oran">  Oran </option>
                        </select>
                    </div>

                    <div>
                        <label> Commune </label>
                        <select id="sectionCommune" defaultValue={'DEFAULT'} onChange={getCommune} className='selectfield'>
                            <option value="DEFAULT" disabled>Choose a salutation ...</option>
                            <option id="ptions" selected value="Commune1">  Commune1</option>
                            <option id="ptions" value="Commune2"> Commune2 </option>
                            <option id="ptions" value="Commune3"> Commune3</option>
                            <option id="ptions" value="Commune4">  Commune4 </option>
                        </select>
                    </div>
                </div>

                <div className='addressField'>
                    <div>
                        <label> Adresse</label>
                        <input type="text" className='inputAdressField' value={adress} onChange={(e) => setAdress(e.target.value)} />
                    </div>
                </div>


                <div className='vehiculeField'>
                    <div>
                        <label> Véhicule : </label>
                    </div>
                    <div>

                        <input type="radio" label="Moto" value="Moto" name="vehi" id="radioChecked" onClick={() => vehiculeName()} />
                        <label> Moto </label>

                    </div>
                    <div>

                        <input type="radio" label="Voiture" value=" Voiture" name="vehi" id="radioChecked" onClick={() => vehiculeName()} />
                        <label> Voiture </label>
                    </div>

                </div>


                <div className='autoInfo'>
                    <div>
                        <label>Matricule</label>
                        <input type="text" className='inputautoinfoField' onChange={(e) => setMatricule(e.target.value)} />
                    </div>
                </div>


                <div className='autoInfo'>
                    <div>
                        <label>Permis de conduire</label>
                        <input type="file" onChange={uploadHandlerPermis} name="file" />
                    </div>

                    <div>
                        <label>Carte grise</label>
                        <input type="file" onChange={uploadHandlerCarteG} name="file" />
                    </div>
                </div>

                <div className='pwfields'>
                    <div>
                        <label> Mot de passe</label>
                        <input type="password" onChange={(e) => 
                            
                            {
                                setPassword(e.target.value);
                                setData({Password : e.target.value, Email : email, Telephone : tel, Prenom : prenom, Nom : nom, id : id, Wilaya: wilaya,
                                    Commune: commune,
                                    Adresse: adress,
                                    Vehicule: vehicule,
                                    Matricule: matricule,
                                    Permis: permis,
                                    Cartegrise: cartegrise})

                            }
                            } />
                    </div>
                    <div>
                        <label> Confirmer mot de passe</label>
                        <input type="password" onChange={(e) => setConfirmationPassword(e.target.value)} />
                    </div>
                </div>

                <button className="btn-Signup" onClick={() => submit()}> S'inscrire</button>

                        </div> */}
        </div>
    )
}
