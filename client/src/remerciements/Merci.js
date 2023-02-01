import React from 'react'
import '../remerciements/Merci.css'
import NavBar from '../navBar/NavBar'
import Footer from '../footer/Footer'
import Livreur from '../images/Beep Beep - Small Vehicle.png'
export default function Merci() {
  return (
    <div className='Merci'>
        <div className='componentrmerci'> <NavBar /> </div>
        <div className='merciContent'> 
           <div className='thank'> Merci pour votre confiance ! </div>
           <div className='reception'> Vous recevrez les offres de livraison sur votre boite mail </div>
            <div className='seeyou'>À trés bientôt </div>
            <div>  <img src={Livreur}  className="livreurimg"/></div>
         </div>

         <div className='componentrmerci'> <Footer /></div>
    </div>
  )
}
