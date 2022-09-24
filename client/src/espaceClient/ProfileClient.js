import React from 'react'
import '../espaceClient/ProfileClient.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Confirmation from '../confirmerLivraison/Confirmation'
import { stringify } from 'uuid'
import NavBar from '../navBar/NavBar'
import Footer from '../footer/Footer'
import Wilaya from '../dz.json'
import { Table } from 'react-bootstrap';
import { Offcanvas } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import Setting from '../../src/images/setting-icon.png'
import Alert from '@mui/material/Alert';
import { Navigate } from 'react-router'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import Form from '../form/Form'
export default function ProfileClient() {
const navigatHome = useNavigate();
const { t } = useTranslation(["common"]);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [adress, setAdress] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [statut, setStatut] = useState("");
    const [password, setPassword] = useState("");
    const [alertSuccess, setAlertsucess] = useState(false);
    const [msgSuccess, setMsgsuccess] = useState("")
    // const [confirmationPassword, setConfirmationPassword] = useState();
    const [id, setId] = useState();
    const [changeInfo, setChangeInfo] = useState(false);
    // const [showProfil, setShowProfil] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    //  const [showLivForm, setShowLivForm] = useState(false);
    //  const [showTransForm, setShowTransForm] = useState(false);
    const [data, setData] = useState([]);
    const [contactLivreur, setContactLivreur] = useState([])
    const [s, setS] = useState(false);
    // const [filteredData, setFilteredData] = useState([])
    //  const [resultData, setResultData] = useState([]);
    const [state, setState] = useState('onHold')
    const [confirmationState, setConfirmationState] = useState({
        clientID: "1234",
        state: state,
        potentielLiv: [],
        depart: "DEP 1",
        arrivee: "AR 1"
    })


    const [rrr, setRrr] = useState({
        Id: id,
        Nom: nom,
        Prenom: prenom,
        Telephone: tel,
        Adress: adress,
        Statut: statut,
        Password: password
    })

    // const [notFoundAlert, setNotFoundAlert] = useState(false)
    const [notFoundAlertt, setNotFoundAlertt] = useState(false)
    const [wilayaLiv, setWilayaLiv] = useState();
    const [wilayaTrans, setWilayaTrans] = useState();
    const [emailArray, setEmailArray] = useState([])
    const [potentialLivreurId, setPotentialLivreurId] = useState([])
    //  const [messageError, setMessageError] = useState("aucun livreur n'est disponible");
    const [showmessageerror, setshowmessageerror] = useState(false)
    const [showContact, setShowContact] = useState(true)
    const [contactMessage, setContactMessage] = useState("")
    const [vehicule, setVehicule] = useState();
    const [showLivreur, setShowLivreur] = useState(false)
    const [ss, setSs] = useState(false)
    // const [hideClass, setHideClass] = useState(false)
    const [filtData, setFiltData] = useState({ Commune: "" })
    const [showOffcanva, setShowOffCanva] = useState(false);
    const [show, setSow] = useState(false);
    const [resultNull, setResultNull] = useState(false)
    const [showReport, setShowReport] = useState(false);
    const [sumaryLivraison, setSummaryLivrason] = useState([])
    const [telLivreur, setTelLivreur] = useState("");
    const [alertSignal, setAlertSignal] = useState(false);
    const [messageSignal, setMessageSignal] = useState("")
    const [stateAlrt, setStateAlrt] = useState("success")

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

 


    const showOffCanva = () => {
        setShowOffCanva(!showOffcanva);
    }

    const selectUser = () => {
        console.log(id)
        const wilayaString = JSON.stringify(wilayaLiv);
        const vehiculeSting = JSON.stringify(vehicule);
        // console.log(potentialLivreurId);
        axios.post('http://www.localhost:2000/appliv/userLivreur/getListUser', {
            Wilaya: wilayaString,
            Vehicule: vehiculeSting
        }, {
            headers: {
                'Content-Type': "application/json"
            }
        }).then((res) => {
            console.log(res);
            if (res.data.data.length != 0) {
                let vect = [];

                setContactLivreur(res.data.data);
                setShowSpinner(true);
                filterData(res.data.data);
                setTimeout(() => {

                    vect = JSON.stringify(potentialLivreurId);
                    let idd = JSON.stringify(id);
                    console.log(vect)
                    axios.post('http://www.localhost:2000/appliv/client/saveSearch', {
                        VectorIdLivreur: vect,
                        idClient: idd
                    }, {
                        headers: {
                            'Content-Type': "application/json"
                        }
                    }).then((res) => console.log(res));

                    setShowContact(false);
                    setShowLivreur(true);

                }, 1000)
            }
            else {
                setShowContact(false);
                setResultNull(true)
            }
        }

        )
    }


    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    }



    const clickSubmit = () => {
        setSs(!ss);
        setTimeout(() => {

            if (contactLivreur.length == 0) {
                setNotFoundAlertt(!notFoundAlertt);
                setSs(false);
            }

            else {
                const idClient = localStorage.getItem('Email');
                contactLivreur.map((elm) => {
                    return (
                     

                        setPotentialLivreurId(potentialLivreurId.push(elm.id)),
                        setEmailArray(emailArray.push(elm.Email))
                    )
                })

                axios.post('http://localhost:2000/appliv/', {
                    Emailarray: emailArray,
                    Id: potentialLivreurId,
                    idClient: idClient
                }).then((res) => console.log(res));
                setSow(!show);
                setSs(false);
            }

        }, 2000)
     
    }


    const getListUser = (com, vehic) => {
       

        setFiltData({
            Wilaya: com,
            Vehicule: vehic
        });

        const comm = JSON.stringify(filtData)

        axios.post(`http://localhost:2000/appliv/userLivreur/getListUser`, comm, {
            headers: {
                'Content-Type': "application/json"
            }
        }).then((res) => {
            if (res.data.data) {
                setShowSpinner(true);
                setTimeout(() => {
                    setSs(!ss);
                    setData(res.data.data);
                    setS(!s);
                }, 1000);
            }
            else {
                setNotFoundAlertt(!notFoundAlertt);
            }


        })
    }

    const getWilaya = () => {
        const optionsValue = document.querySelector('#sectionWilaya');
        setWilayaLiv(optionsValue.value);
        setRrr({
            Id: id,
            Statut: statut,
            Nom: nom,
            Prenom: prenom,
            Adress: adress,
            Telephone: "0"+tel,
            Email: email,
            Password: password,

        });
    }


    const getVehicule = () => {
        const optionsValue = document.querySelector('#sectionVehi');
        setVehicule(optionsValue.value);
    }


    // ***********  FILTRER DATA  **************
    const filterData = (data) => {
        const date = new Date();
        console.log(data)
        const hour = date.getHours();
        const min = date.getMinutes();
        const dateSend = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();
        const timeSend = hour + ':' + min;
        const idClient = localStorage.getItem('Email');
        setSs(!ss)
    
        data.map((elm) => {
            return (
                // console.log(elm.Email),
                setPotentialLivreurId(potentialLivreurId.push(elm.id)),
                setEmailArray(emailArray.push(elm.Email))
            )
        })

        //   console.log(potentialLivreurId)

        // *********** Send email ***************** 

        if (emailArray.length != 0) {

            axios.post('http://localhost:2000/appliv/', {
                Emailarray: emailArray,
                Id: potentialLivreurId,
                idClient: idClient
            }).then((res) => console.log(res));
            data.map((elm) => {
                return (
                    setConfirmationState(confirmationState.potentielLiv.push(elm.Email))
                )
            })
        }

        setTimeout(() => {
            setSs(!ss);
            setS(true)
        }, 6000)

       

    }


    const getStatut = () => {
        const optionsValue = document.querySelector('#sectionStatut');
        setStatut(optionsValue.value);
        rrr.Statut = optionsValue.value

    }




    const getInfo = (ID) => {
        const id = JSON.stringify(ID.replace('"', ''));
        axios.post('http://localhost:2000/appliv/userLivreur/getContact', {
            id: id
        }).then((res) => {
            if (res.data.data.length != 0) {
                setShowContact(!showContact);
                setContactMessage(res.data.data[0].Telephone)
            }
        }

        )
    }


    const getAlleInfoClient = () => {
        const emailClient = localStorage.getItem('Email');
        console.log(emailClient)

        const EmailSesstion = {
            Email: emailClient
        }
        const dataTosend = JSON.stringify(EmailSesstion);

        axios.post(`http://localhost:2000/appliv/client/clientInfo`, dataTosend, {
            headers: {
                'Content-Type': "application/json"
            }

        }).then((res) => {
            console.log(res)
            setNom(res.data.data.Nom);
            setPrenom(res.data.data.Prenom);
            setAdress(res.data.data.Adress);
            setId(res.data.data.id);
            setTel("0" + res.data.data.Telephone);
            setStatut(res.data.data.Statut);
            setEmail(res.data.data.Email);
           
        }
        );
        setRrr({
            Id: id,
            Statut: statut,
            Nom: nom,
            Prenom: prenom,
            Adress: adress,
            Telephone: tel,
            Email: email,
            Password: password,

        });
    }


    const upDateInfoClient = () => {
    
        const strfyRr = JSON.stringify(rrr);
        axios.post(`http://localhost:2000/appliv/client/upDatInfo`, strfyRr, {
            headers: {
                'Content-Type': "application/json"
            }
        }).then((res)=> { 
            console.log(res)
            setMsgsuccess(res.data.message);
             setAlertsucess(!alertSuccess)
        } );

    }

    /*
        const getReport = () => {
            const idStrin = JSON.stringify(id);
            // console.log(idString)
            axios.post(`http://localhost:2000/appliv/client/getreport`, { idClient: idStrin }, {
                headers: {
                    'Content-Type': "application/json"
                }
            }).then((res) => {
                setSummaryLivrason(res.data.data)
                console.log(res.data.data)
            })
        }
    
    */



    const sendSignaLivreur = () => {

        if (telLivreur) {
            const stringPhone = JSON.stringify(telLivreur);
            const stringId = JSON.stringify(id);
            axios.post(`http://localhost:2000/appliv/client/signal`, { Phone: stringPhone, Client: stringId }, {
                headers: {
                    'Content-Type': "application/json"
                }
            }).then((res) => {
                setMessageSignal(res.data.message);
                setAlertSignal(true);
                if (res.data.message == "Livreur n'existe pas") {
                    setStateAlrt("error")
                }
                else {
                    setStateAlrt("success")
                }
                //  console.log(res);

            })
            console.log(stringPhone);
        }

        else {
            setMessageSignal("Entrer numéro de téléphone");
            setAlertSignal(true)
            setStateAlrt("error")
        }
    }


    const deconnexion = () => {
        localStorage.setItem('statut', 'deconnect');
        navigatHome('/')
    }


    useEffect(() => {
        getAlleInfoClient()
        const r = JSON.stringify(localStorage.getItem('statut'));
        console.log(r)
    }, []);

useEffect(()=> {
    setRrr({
        Id: id,
        Statut: statut,
        Nom: nom,
        Prenom: prenom,
        Adress: adress,
        Telephone: tel,
        Email: email,
        Password: password,

    });
}, [statut, nom, prenom, adress, tel, email, password])


    return (
        <div className='ProfileClient'>
            <div className='navbarProfil'> <NavBar /> </div>
            {(!showOffcanva) && <div className='buttonOption' onClick={() => showOffCanva()}> <img src={Setting} className="sittingimg" /></div>}






            
                <Offcanvas show={showOffcanva} onHide={() => showOffCanva()} placement='end' className="offcanva">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className='offCanvaTitle'> <img src={Setting} className="imgcanva" />    {t("parametreprofil")} </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body >
                        <div> <button className='optionsItem' onClick={() => { getAlleInfoClient(); showOffCanva(); setChangeInfo(true); setShowReport(false); setShowContact(false); setResultNull(false); setShowLivreur(false) }}>  {t("modificationinformation")}  </button>  </div>
                        <div> <button className='optionsItem' onClick={() => { setShowContact(false); setChangeInfo(false); setShowReport(true); setShowContact(false); setResultNull(false); setShowOffCanva(!showOffcanva);  setShowLivreur(false)  }}> Signaler un livreur  </button> </div>
                        <div>  <button className='optionsItem' onClick={() => { getAlleInfoClient(); setShowContact(true); setChangeInfo(false); setShowReport(false); showOffCanva(); setResultNull(false); setShowLivreur(false); setShowSpinner(false); window.location.reload(); }}>  {t("chercherlivreur")} </button> </div>
                        <div>  <button className='optionsItem' onClick={() => { deconnexion()}}> Déconnexion </button> </div>
                    </Offcanvas.Body>
                </Offcanvas>


            


            {showContact && <div className='profileTitle'>
                <h1>   {t("bienvenue")} </h1>
                <h3>   {t("trouverlivreur")} </h3>
            </div>}

            {showContact &&
                <div className='formcontent search'>
                    {showSpinner && <div className='spinnerBox'>
                        <div>  <Spinner className='spinner' animation="grow" variant="warning" size="lg" /> </div>
                    </div>}
                    <form>
                        <div className='formcontainer'>
                            <div className='formcontaineritem'>
                                <div>
                                    <div className='formcontaineritemTitle'>   {t("wilayadelivraison")} </div>
                                    <div className='obligatoire'> (Champ obligatoire)</div>

                                </div>
                                <div>   <select id="sectionWilaya" defaultValue={'DEFAULT'} onChange={() => getWilaya()} className='selectfield'>
                                    <option value="DEFAULT" disabled>   {t("choixwilaya")}</option>
                                    {Wilaya.map((elm) => {
                                        return (
                                            <option id="ptions" selected value={elm.city}>  {elm.city}</option>
                                        )
                                    })}
                                </select> </div>
                            </div>


                            <div className='formcontaineritem'>
                                <div>
                                    <div className='formcontaineritemTitle'>  {t("vehiculedelivraison")} </div>
                                    <div className='obligatoire'> (Champ obligatoire)</div>

                                </div>
                                <div>     <select id="sectionVehi" defaultValue={'DEFAULT'} onChange={() => { getVehicule() }} className='selectfield'>
                                    <option value="DEFAULT" disabled> {t("choixvehicule")} </option>
                                    <option id="ptionsVehi" selected value="Moto"> {t("moto")} </option>
                                    <option id="ptionsVehi" value="Voiture">  {t("voiture")} </option>
                                    <option id="ptionsVehi" value="Fourgon">  {t("Fourgon")} </option>
                                </select> </div>
                            </div>

                            <div> <div className='buttonchercher' onClick={() => selectUser()}> <div>   {t("chercher")}</div></div></div>
                        </div>
                    </form>
                </div>}



            {
                /** AFFICHER LA LISTE DES LIVREURS  **/
                showLivreur && <div className='livreurContactContainer'>

                    <div className='livreurContactContent'>
                        <div className='titleResulat'> <h1>  {t("resultatrecherche")}  </h1> </div>
                        <Table striped>
                            <thead>
                                <tr>
                             
                                    <th className='titleTable'> {t("nom")} </th>
                                    <th className='titleTable'>{t("prenom")} </th>
                                    <th className='titleTable'> {t("telephone")} </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    contactLivreur && shuffle(contactLivreur).map((elm) => {
                                        return (
                                            <tr>
                                      
                                                <td>{elm.Nom.toUpperCase()}</td>
                                                <td>{elm.Prenom.toUpperCase()}</td>
                                                <td>0{elm.Telephone}</td>
                                            </tr>
                                        )
                                    })
                                }


                            </tbody>
                        </Table>


                    </div>
                </div>}



            {
                resultNull && <div className='alrtNotFound'> <div>  Aucun Livreur trouvé </div> <div> (0) </div> </div>
            }





            {
                changeInfo && <div className='formContainer'>


                    <div className='settingInfoTitle' id="titleSetting">
                        <h1> {t("modifier")} </h1>
                        <h3> {t("infoperso")} </h3>
                    </div>


                    <div className='formContent'>
            
                    <Form 
                    profil={true} name={nom} getName={getname} secondname={prenom} getsecondName={getSecondName} 
                    Adress={adress} getAdress={getadress}  
                    phone={rrr.Telephone} getPhone={getphone} Email={email} getEmail={getemail}
                    password={password}  getPassword={getpassword}
                    getStatutprofil={getStatut} Submit={upDateInfoClient} 
                    Success={alertSuccess} msgSuccess={msgSuccess} Error={false} 
                    msgError={false} link="#titleSetting"
                    
                    />

                    </div>
                </div>
            }


            {showReport && <div className='tab'>
            <div className="titleSection">  <h1> Signaler </h1> <h2>  un Livreur </h2></div>
      
                <div className='tabContainer'>
                    <div>
                        <div className='labelTabContainer'>  {t("entrerlivreur")}  </div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input type="text" onChange={(e) => setTelLivreur(e.target.value)} className="inputTel" onClick={() => setAlertSignal(false)} />
                            <div className='signalButton' onClick={() => sendSignaLivreur()}>   <button> Signaler </button> </div>
                        </form>
                        {alertSignal && <div className='alrtSignal'> <Alert severity={stateAlrt} className='errorAlrt'> {messageSignal}</Alert> </div>}
                    </div>
                </div>
            </div>}




            <div className='footerProfil'> <Footer /> </div>







          




        </div>
    )
}
