import logo from './logo.svg';
import { Suspense } from 'react';
import './App.css';
import Home from './HomePage/Home';
import LandingPage from './landingPage/LandingPage';
import LoginLivreur from './ConnexionLivreurs/Login';
import SignUp from './ConnexionLivreurs/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Account from './Entreprises/Account';
import ProfileClient from './espaceClient/ProfileClient';
import Confirmation from './confirmerLivraison/Confirmation';
import SwichConnexion from './switchConnexion/SwichConnexion';
import ConnexionClient from './connexionClients/ConnexionClient';
import SignupClient from './connexionClients/Signup'
import { BrowserRouter } from "react-router-dom";
import NavBar from './navBar/NavBar'
import Footer from './footer/Footer';
import Form from './form/Form';
import Merci from './remerciements/Merci';
import Contact from './contact/Contact';
function App() {
  return (<Suspense fallback={null}> 
    <div className="App">



<BrowserRouter>
<Routes> 
       
          <Route path="/" element={<Home />} />
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/loginLivreur" element={<LoginLivreur />} />
          <Route path="/signUpLivreur" element={<SignUp />} />
          <Route path="/AccountBusiness" element={<Account />} />
          <Route path="/profile" element={<ProfileClient />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/connexion" element={<SwichConnexion />} />
          <Route path="/connexionClient" element={<ConnexionClient />} />
          <Route path="/signupClient" element={<SignupClient />} />
          <Route path="/Merci" element={<Merci />} />
       <Route path="/nav" element={<NavBar />} />
       <Route path='/footer' element={<Footer />} />
       <Route path='/contact' element={<Contact />} />
       <Route path='/form' element={<Form />} />
          </Routes>
 </BrowserRouter>



    </div>
</Suspense>
  );
}

export default App;
