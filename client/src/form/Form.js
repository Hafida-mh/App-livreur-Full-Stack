import React from 'react'
import Style from '../form/Form.css'
import Wilaya from '../dz.json'
import Alert from '@mui/material/Alert';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
export default function Form(props) {
    const { i18n, t } = useTranslation(["common"])
    return (
        <div className='formcontainer'>
            <div className='formcontent'>
                {
                  props.Success && <div className='alrtContainer'>
                         <div className='alrt'>
                             <Alert severity="success" className='errorAlrt'> {props.msgSuccess}</Alert>
                          </div>
                   </div>
                 }

                  {
                    props.Error && <div className='alrtContainer'>
                           <div className='alrt'>
                               <Alert severity="error" className='errorAlrt'>{props.msgError}</Alert>
                            </div>
                      </div>
                   }

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className='formItem'>
                        <div className='nameForm'>
                            <div className='formNomination'> {t("nom")} </div>
                            <div> 
                                   <input 
                                        className='inputFiled' 
                                        type="text" 
                                        value={props.name}
                                        onChange= {props.getName} />
                            </div>
                        </div>
                        <div className='nameForm'>
                            <div className='formNomination'>  {t("prenom")} </div>
                            <div> 
                                    <input 
                                        className = 'inputFiled' 
                                        type = "text" 
                                        value = {props.secondname} 
                                        onChange = {props.getsecondName} />
                            </div>
                        </div>
                    </div>
                    <div className='formItemInfo'>
                        <div className='nameFormInfo'>
                            <div className='formNomination'>  {t("adresse")} </div>
                            <div> 
                                    <input 
                                        className = 'inputFiledInfo' 
                                        value = {props.Adress} 
                                        onChange = {props.getAdress} />
                             </div>
                        </div>
                    </div>
                    <div className='formItemInfo'>
                        <div className='nameFormInfo'>
                            <div className='formNomination'>  {t("telephone")} </div>
                            <div> 
                                    <input 
                                       className='inputFiledInfo' 
                                       type="text" 
                                       onChange={props.getPhone} 
                                       value={props.phone} />
                             </div>
                        </div>
                    </div>

                    <div className='formItemInfo'>
                        <div className='nameFormInfo'>
                            <div className='formNomination'>   {t("email")} </div>
                            <div> 
                                     <input 
                                        className = 'inputFiledInfo' 
                                        type = "text" 
                                        valu e= {props.Email} 
                                        onChange = {props.getEmail} />
                             </div>
                        </div>
                    </div>
                    <div className='formItem password'>
                        <div className='nameForm'>
                            <div className='formNomination'> {t("motdepass")} </div>
                            <div> 
                                    <input 
                                       className = 'inputFiled' 
                                       type = "password" 
                                       value = {props.password} 
                                       onChange = {props.getPassword} />
                             </div>
                        </div>
                        <div className='nameForm confirmation'>
                            <div className='formNomination confirmation'>   {t("confirmation")} </div>
                            <div> 
                                     <input 
                                        className = 'inputFiled' 
                                        type = "password" 
                                        value = {props.confirmedPassword} 
                                        onChange = {props.getConfirmedpassword} />
                            </div>
                        </div>
                    </div>
                    {props.profil && <div className='profilClient'>
                        <div className='profilClientNomination'> {t("vousetes")}  :  </div>
                        <div className='selectChoice'>
                            <div>  
                                  <select 
                                         id="sectionStatut" 
                                         defaultValue={'DEFAULT'} 
                                         onChange={props.getStatutprofil} 
                                         className='selectfieldInfo'>
                                    <option value="DEFAULT" disabled>  {t("choix")} ...</option>
                                    <option id="ptions" selected value=" Un magasin">  {t("magasin")} </option>
                                    <option id="ptions" value="Une entreprise">  {t("entreprise")} </option>
                                    <option id="ptions" value="Un particulier">  {t("particulier")} </option>
                                  </select>
                           </div>
                        </div>
                    </div>}
                    {props.vehicule && <div className='profilClient'>
                        <div className='profilClientNomination'> {t("quelestvehicule")}   :  </div>
                        <div className='selectChoice'>
                            <div>  
                                  <select id="sectionVehicule" 
                                        defaultValue={'DEFAULT'}  
                                        onChange={props.getvehicule}  
                                        className='selectfieldInfo'>
                                    <option value="DEFAULT" disabled> {t("quelestvehicule")}  </option>
                                    <option id="ptions" selected value="Moto">  {t("moto")}  </option>
                                    <option id="ptions" value="Voiture"> {t("voiture")}  </option>
                                    <option id="ptions" value="Fourgon">  Fourgon </option>

                                    </select>
                             </div>
                        </div>
                    </div>}
                    {
                        props.wilaya && <div className='profilClient'>
                            <div className='profilClientNomination'> {t("wilayadelivraison")}   :  </div>
                            <div className='selectChoice'>
                                <div>  
                                    <select 
                                        id="sectionStatut" 
                                        defaultValue={'DEFAULT'} 
                                        onChange={props.getWilaya} 
                                        className='selectfieldInfo'>
                                          <option value="DEFAULT" disabled> {t("wilayadelivraison")}  </option>
                                    {Wilaya.map((elm) => {
                                        return (
                                            <option id="ptions" selected value={elm.city}>  {elm.city} </option>
                                        )
                                    })}
                                    </select>
                                </div>
                            </div>
                        </div>}
                        <div className='buttonContainer'> <a href={props.link}>  <div className='buttonConnexion' onClick={props.Submit}> <div className='button'> {t("sinscrire")}  </div></div> </a> </div> 
                </form>
            </div>
        </div>
    )
}
