import StyleHome from '../HomePage/HomeCSS.css'
import { useState, useEffect } from 'react'
import NavBar from '../navBar/NavBar';
import React from 'react'
import Footer from '../footer/Footer';
import AOS from "aos";
import Moto from '../images/Beep Beep - Small Vehicle.png'
import Client from '../images/Shiny Happy - Morning Jog.png'
import "aos/dist/aos.css";
import LogoWhite from '../images/Logo_Plan de travail 1 (3).png'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const [showStatut, setShowStatut] = useState(false);
  const [hideStatut, setHideStatut] = useState(true);
  const [connexionn, setConnexionn] = useState(false);

  const { t } = useTranslation(["home"]);

  const checkConnexion = () => {
    const r = localStorage.getItem('statut');
    console.log(r)

    if (r === "connect") {
      setShowStatut(!showStatut)
      setHideStatut(false)

    }
    else {
      setHideStatut(true)
      setShowStatut(false)
    }
  }



  useEffect(() => {
    checkConnexion();
    AOS.init();
    AOS.refresh();
  }, []);


  console.log(showStatut)


  return (
    <div className="Home">

 <div className='navHome'>  <NavBar className="navbar" /> </div>
   {/* <NavBar className="navbar" /> */}

{

  <div className='slideContainer'>
{ <div className='sides' data-aos="zoom-in"  data-aos-duration="1500">
    <div className='titleSection1'> خلاص  </div>
    <div className='titleSection2'> مشاكل </div>
    <div className='titleSection3'> livraison </div>
   
    <div className='buttonsSection'> 
    <div className='button1'> <a href="#cli">  <button >  Je cherche un livreur</button> </a></div>
    <div className='button1'> <a href="#liv"> <button > Je suis livreur  </button>  </a></div>
    </div>
  </div>
}

  <div className='sides images'>
    <img src={Client} className="client"/>
    <img src={Moto} className="moto" />
  </div>

</div>

}
    





      <div className='clique'>
        <div>{t("but")}</div>
        <div className='cliqueFleche'>  > </div>
      </div>


      <div className='objectifSection'>
        <div className='objectifTitle' data-aos="fade-up"> {t("but")}  </div>
        <div className='objectifTexte' data-aos="fade-down">  {t("textbut")}  </div>
        <div className='clique'>
          <div> {t("commentçamarche")}</div>
          <div className='cliqueFleche'>  > </div>
        </div>
      </div>



      <div className='workSection'>
    
        <div className='workTitle' id="cli">
          <div data-aos="zoom-in">
            {t("commentçamarche")}
          </div>
        </div>



        <div className='workSection1' >
          <div className='cherche'> <div className='checheTitle' > {t("jecherche")}</div>  <div className='chercheLivreur'  > {t("jechercheunlivreur")} </div></div>
          <div className='clientSection'>
            <div className='clientSectionText' data-aos="zoom-in"> {t("coneexiontextcient")}</div>
            <div className='linkConnexion'>   <Link to="/connexionClient" className='linkToClient'> > {t("connexionespaceclient")}  </Link></div>
            <div className='livreur'>  <div> {t("unlivreur")} </div>  </div>

          </div>
        </div>


        <div className='ouAlors' id="liv">
          <div> {t("oualors")}</div>
        </div>

        <div className='workSection1 section2' >
          <div className='cherche' > <div className='checheTitle' >{t("jecherche")}</div>  <div className='chercheLivreur'> {t("jechercheunclient")} </div></div>
          <div className='clientSection'>
            <div className='clientSectionText livr' data-aos="zoom-in"> {t("connexiontextlivreur")}  </div>
            <div className='linkConnexion'> <Link to="/loginLivreur" className='linkToClient'>  > {t("connexiobspacelivreur")} </Link></div>
            <div className='livreur'>  <div> {t("unclient")} </div>  </div>

          </div>
        </div>







      </div>

      { /*
        hideStatut && (<div className='connexionLink'> <Link to="/connexion"> Connexion </Link></div>)
        */
      }


      { /*
        showStatut && <div className='connexionLink' onClick={()  => {
          const r = localStorage.setItem('statut', 'deconnect');
          setShowStatut(false);
          setHideStatut(true)
        }}> Deconnection </div>
        */
      }


      { /*
      <div className="homeContainer">

        <div> <button> Je cherche un camionneur </button></div>
        <div> <Link to="/connexionClient" > <button> Je cherche un livreur </button> </Link></div>
    </div> */}





      <div className='askHelp'>
        <div className='helpTitle'> {t("aide")} </div>
        <Link to="/contact" className='linkToContact'>  <div className='contactButton'> <div> {t("contacteznous")} </div> </div> </Link>
      </div>



     
<div> <Footer /></div>


    </div>
  )
}
