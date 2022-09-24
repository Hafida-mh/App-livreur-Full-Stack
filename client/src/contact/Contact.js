import React from 'react'
import NavBar from '../navBar/NavBar'
import '../contact/Contact.css'
import { useState } from 'react'
import Footer from '../footer/Footer'
import { useTranslation } from 'react-i18next'
export default function Contact() {

    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [email, setEmail] = useState("");
    const { t } = useTranslation(["common"]);
    return (
        <div className='Contact'>

            <div className='navv'>
                <NavBar />
            </div>


            <div className='ContactTile'>
                <div> <h1> {t("esapcecontact")}   </h1>  </div>
                <div> <h3> {t("conctactnous")}   </h3></div>
            </div>

            <div className='formContainer'>
                <div className='formContent'>

                    <form style={{ "marginTop": "20px" }} onSubmit={(e) => e.preventDefault()}>

                        <div className='formItem'>
                            <div className='nameForm'>
                                <div className='formNomination'>   {t("nom")}  </div>
                                <div> <input className='inputFiled' type="text" value={nom} onChange={(e) => setNom(e.target.value)} /></div>
                            </div>

                            <div className='nameForm'>
                                <div className='formNomination'>   {t("prenom")}  </div>
                                <div> <input className='inputFiled' type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} /></div>
                            </div>
                        </div>


                        <div className='formItemInfo'>
                            <div className='nameFormInfo'>
                                <div className='formNomination'>   {t("email")}  </div>
                                <div> <input className='inputFiledInfo' type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                            </div>
                        </div>

                        <div className='formItemInfo'>
                            <div className='nameFormInfo'>
                                <div className='formNomination'>   {t("message")} </div>
                                <div> <input className='inputFiledInfo messageInput' type="text"  /*onChange={(e) => setTel(e.target.value)} value={tel}*/ /></div>
                            </div>
                        </div>





                        <div className='buttonContainer'> <div className='buttonConnexion' /*onClick={() => submit()}*/> <div className='button'>  {t("envoyer")}  </div></div> </div>

                    </form>



                </div>
            </div>


            <div> <Footer /> </div>


        </div>
    )
}
