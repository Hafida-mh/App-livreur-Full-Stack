import React from 'react'
import '../navBar/Nav.css'
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { CloseButton } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Logo from '../images/Logo-02.png'
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import Profil from '../images/reshot-icon-user-7ZXA3QERGV.svg'
import Moto from '../images/Beep Beep - Small Vehicle.png'
import Burgerbutton from '../images/reshot-icon-menu-D6U5PY3TJK.svg'
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import NavDropdown from 'react-bootstrap/NavDropdown';
export default function NavBar() {
  const navigate = useNavigate();
  const lang = ["Fr", "Ar"];
  const [email, setEmail] = useState()
  const [showProfil, setShowProfil] = useState(false);
  const [show, setShow] = useState(false);
  const [connexionn, setConnexionn] = useState(false);
  const { i18n, t } = useTranslation(["common"])

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("fr")
    }
  }, []);

  const handlechangelng = (el) => {
    i18n.changeLanguage(el);
  }
  const clickConnexion = () => {
    setConnexionn(!connexionn)
  }

  const showResponsiveNav = () => {
    setShow(!show);
  }

  const verifyConnexion = () => {
    const statut = localStorage.getItem('statut');
    if (statut === "connect") {
      setShowProfil(true);
      setEmail(localStorage.getItem('Email'))
    }
  }

  const redirect = () => {
    const statut = localStorage.getItem('statut');
    if (statut === "connect") {
      navigate('/profile');

    }
    else {
      navigate('/connexionClient');
    }
  }
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {email}
    </Tooltip>
  );

  useEffect(() => { verifyConnexion() })

  return (



    <div className='navContainer'>





      <Navbar collapseOnSelect expand="lg" fixed="top" className='navBar'>
        <Container>
          <Navbar.Brand href="#home" className='logoNav'>  <img src={Logo} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"  className="toggleButton"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features" className='itemnav' Style={{ "color": "black" }}> <div>  <Link to="/" className='linkNav'>  {t("accueil")} </Link> </div></Nav.Link>
              <Nav.Link href="#pricing" className='itemnav'> <div> <Link to="/signUpLivreur" className='linkNav'>  {t("espacelivreur")} </Link> </div></Nav.Link>
              <Nav.Link href="#pricing" className='itemnav'> <div onClick={ ()=> redirect()}>    {t("espaceclient")}  </div> </Nav.Link>
              <Nav.Link href="#pricing" className='itemnav'> <div> <Link to="/contact" className='linkNav'>  {t("contact")} </Link>  </div></Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">
                <NavDropdown title="Langue" id="collasible-nav-dropdown" className='langageSelect'>
                  {lang.map((elm) => {
                    return (
                      <NavDropdown.Item href="#action/3.1" eventKey="Fr" onClick={() => handlechangelng(elm)}> {elm}</NavDropdown.Item>
                    )
                  })}

                </NavDropdown>

              </Nav.Link>
              {!showProfil && <Nav.Link eventKey={2} href="#memes">
                <button className='buttonConnexionNav'> <Link to="/connexionClient" className='linkNav'>  {t("connexion")} </Link> </button>
              </Nav.Link>}

              <Nav.Link>
                {showProfil &&
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip} className="overLayTrigger">
                    <Link to="/profile" className='linkNav'><div className='connexionProfil'> <img src={Profil} className="profil" /></div> </Link>
                  </OverlayTrigger>
                }
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>









      { /*  <div className='logoContent'> <img src={Logo} /> </div>

      <div className='navItem'>

        <div> <Link to="/" className='linkNav'>  {t("accueil")} </Link> </div>
        <div> <Link to="/signUpLivreur" className='linkNav'>  {t("espacelivreur")} </Link> </div>
        <div onClick={() => redirect()}> <Link to="/connexionClient" className='linkNav'>  {t("espaceclient")} </Link> </div>
        <div>  <Link to="/contact" className='linkNav'>  {t("contact")} </Link> </div>

      </div>

      <div className='connexion'>
        <div className='langage'>
          <select id="sectionLanguage" defaultValue={'DEFAULT'} className='selectfield' value={localStorage.getItem("i18nextLng")} onChange={handlechangelng}>
            <option id="ptions" selected value="ar">  AR</option>
            <option value="fr">FR</option>
          </select>

        </div>
        {(!showProfil) && <div className='button'>
          <div onClick={() => clickConnexion()}> {t("connexion")}  </div>
        </div>}
        <div className='burgerButton'>
          <div onClick={() => showResponsiveNav()}>  <img src={Burgerbutton} className="imgSmallScreen" />  </div>
        </div>

        <div>
          {showProfil &&
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}>
              <Link to="/profile" className='linkNav'><div className='connexionProfil'> <img src={Profil} className="profil" /></div> </Link>
            </OverlayTrigger>
          }
        </div>
      </div>


      {show && <div className='navResponsive'>
        <div>  <Link to="/" className='linkTo'>{t("accueil")} </Link>  </div>
        <div> <Link to="/signUpLivreur" className='linkNav'>  {t("espacelivreur")} </Link> </div>
        <div> <Link to="/connexionClient" className='linkNav'> {t("espaceclient")} </Link>  </div>
        <div> {t("contact")}  </div>
      </div>}


      {connexionn && <div className='choiceConnexion'>
        <div className='choiceConnexioncontainer'>
          <CloseButton className='closeButton' variant='white' onClick={() => clickConnexion()} />
          <h1> {t("vousetes")} ?</h1>
          <div className='clientLivreur'>
            <div className='clientLivreurContainer'>
              <div> <i class="fa-solid fa-arrow-right-from-arc"></i> <Link to="/connexionClient" className='linkToClient'> {t("client")}</Link>  </div>
              <div>  <i class="fa-solid fa-arrow-right-from-arc"></i> <Link to="/loginLivreur" className='linkToClient'> {t("livreur")}</Link> </div>
            </div>
          </div>
        </div>
      </div>} */}
    </div>

  )
}
