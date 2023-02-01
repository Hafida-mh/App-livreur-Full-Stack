import React from 'react'
import '../switchConnexion/SwitchConnexion.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
export default function SwichConnexion() {
    return (
       <div className='SwitchConnexion'>
          <div> <h1> Identifiez-vous </h1> </div>  
          <div> Vous êtes :</div>   
          <div className='identity'> 
             <h3> 
                <li> 
                   <Link to="/loginLivreur"> Livreur  </Link> 
                </li> 
             </h3> 
          </div>
       <div className='identity'>
          <h3> 
              <li> Transporteur </li> 
          </h3> 
        </div>
       <div className='identity'> 
           <h3> 
              <li> 
                <Link to="/connexionClient"> Professionnel/Particulier  </Link> 
             </li> </h3> 
        </div>
      </div>
    )
}
