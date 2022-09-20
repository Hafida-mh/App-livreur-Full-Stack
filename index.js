const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const nodemailer = require("nodemailer");
//const img = require('./client/src/images/Logo-02.png')
var file = require('file-system');


require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',express.static('public'));  // chemin de l'application dans l'hebrgeur

/* IMPORT ROUTERS */
const routerControllUsers = require('./controller/user/router');
const routerConfirmedLivreur = require('./controller/confirmedLivreur/router');
const routerControllerClient = require('./controller/clients/router');
const routerControlClientReq = require('./controller/reqClient/router');
const { json } = require('express');
const { resolveNs } = require('dns');


app.use('/appliv/userLivreur', routerControllUsers);
app.use('/appliv/confirmationProfilLivreur', routerConfirmedLivreur);
app.use('/appliv/client', routerControllerClient);
app.use('/appliv/req', routerControlClientReq)
/*
const userr = process.env.USER;
const databasee = process.env.DATABASE;
*/




app.get('/appliv/hi', (req,res)=>{
   return res.send("hi");
});





app.post('/appliv/',  (req, res) => {

  const Emailarray = req.body.Emailarray;
  const Id = req.body.Id;
  const idClient = req.body.idClient;

  //console.log(idClient)
  //const isValid = "false"
  // const Tel = "7890"
  // const id = "1"

  const date = new Date();
  
  const todayDate = new Date().toISOString().split("T")[0];
  const current_minutes = date.getMinutes();
  const current_hours = date.getHours();

const timer = new Date().toISOString().split("T")[1]

  let transporter = nodemailer.createTransport({
    host: 'mail.centre-laseresthetique.com',  /*smtp.ethereal.email */
    port: 465,
    auth: {
      user: 'centrelaser@centre-laseresthetique.com',
      pass: 'centrelaser'
    }
  });


  for (let i = 0; i <= Emailarray.length - 1; i++) {

    let mailOption = {
      from: 'centrelaser@centre-laseresthetique.com',
      to: "mechkour.hafida16@gmail.com",
      subject: "Hello abed ",
      //  html : `<h1> Hi this is a test </h1>`
      html: `<a href="http://localhost:2000/appliv/verified/${Id[i]}/${idClient}/${todayDate}/${timer}/${current_minutes}/${current_hours}"> clique ici </a>`
    }

    // send mail with defined transport object
    transporter.sendMail(mailOption, function (error, info) {
      if (error) {
      return res.status(400).json({
          message : error
      });
      }

      else {
          
          return res.status(200).json({
              messageSuccess : "message envoyé avec succes"
          });
         

      }
    });

  }

});


/*

app.get('/', (req,res) => {

    const connection = mysql.createConnection({
        host : "localhost", 
        user : "root",
        password : "",
        database : "userDB", 
    
     });
     
    connection.connect(function(err) {
      if (err) throw err;
        
        console.log("Database Connected!");
    });

    const Nom = "hittytyty";
    const Prenom = "hafigergreda";
    const email = "hfefet@gmail.com";
    const telephone = "0778";
    const message = "hello evfelfelfeerybody";

    let stmt = `INSERT INTO userTable(Nom,Prenom,email,telephone, message)
    VALUES(?,?,?,?,?)`;
    
let values =[Nom, Prenom, email, telephone, message];

// execute the insert statment
connection.query(stmt, values, (err, results, fields) => {
if (err) {
return console.error(err.message);
}
// get inserted id
console.log('Todo Id:' + results.insertId);
});

connection.end();



})
*/


app.get('/appliv/verified/:id/:idClient/:todayDate/:timer/:current_minutes/:current_hours', (req, res) => {
  const id = req.params.id;
  const idClient = req.params.idClient;
  const todayDate=req.params.todayDate;
  const timer = req.params.timer;
  const current_hours = req.params.current_hours;
  const current_minutes = req.params.current_minutes;
  
  var arr = [];
  var arrPotentiel  = [];
  const date = new Date();


 const refTime = current_hours + ':' + current_minutes;


 
  const jsonProfile = []

  const actual_Date = new Date();
  const actual_Hour = actual_Date.getHours();
  const actual_Min = actual_Date.getMinutes();



  const todaydate = new Date().toISOString().split("T")[0];
  const todayTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  


   jsonProfile.push(id);

   const finalvector = JSON.stringify(jsonProfile);

   const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "livreur_DB",
  
   });

 
   connection.connect(function (err) {
    if (err) throw err;
    console.log("Database livreur Connected!");
   });


//CommandeClient.id_client = '${idClient}' AND  CommandeClient.Time = '${refTime}'



 const sendCommande = `INSERT INTO CommandeClient (id_client, Liste_livreur, Date, Time) VALUES (?,?,?,?)`;
              let values = [idClient, finalvector, todayDate, timer];
              
              

  connection.query(sendCommande, values, (err, result, fields) => {
                   if (err) {
            return console.log(err);
          }

          else {
             const clientInfo = 'SELECT * FROM signupClient_TB WHERE Email = ?'
             const val = [idClient]
        
             connection.query(clientInfo, val ,(err, results, fields) => {
              if (err) {
                return console.error(err.message);
              }
          
          
              else{
             var string = JSON.stringify(results);
               var json = JSON.parse(string);
  
               console.log(result);
               return    res.send(
                `<div style="display:flex; border:1px hidden black; align-item:flex-start; justify-content: flex-start; flex-direction: column; height : 100vh; width:100%;"> 
                <div> <img src='http://localhost:3000/image/Logo-02.png' /> </div>
                <div style="font-size : 2em; display:flex; align-items:center; justify-content:center"> 
                <div> <img src="http://localhost:3000/image/reshot-icon-box-T9HNYSDPK7.svg" style="width : 2.5em" /> </div>
                <div>  <h1 style="text-align:center; margin-top : 40px; color: #82368C"> Une livraison est disponible  ! </h1> </div>
                </div>
                <div style="display : flex; flex-direction : column; justify-content: space-arround; align-item: center; border : 1px hidden black; width : auto; font-size : 3em; line-height: 65px; margin-top: 30px">  
            
               <div style="margin-left : 20px; border-bottom : 1px solid black"> <b> Nom </b>:  ${results[0].Nom} </div>
               <div style="margin-left : 20px;  border-bottom : 1px solid black"> <b>  Prenom </b>:  ${results[0].Prenom} </div>
               <div style="margin-left : 20px;  border-bottom : 1px solid black"> <b> Teléphone </b>:  0${results[0].Telephone} </div>

<div style="width : 100%; text-align : center; font-size: 0.5em; display:flex; align-items : center; justify-content:center; margin-top : 50px"> <div>  <img src="http://localhost:3000/image/reshot-icon-right-arrow-UCA8NGYZDJ.svg" style="width : 1.5em; margin-right : 10px; margin-top : 5px"/> </div>
 <div> Revenir au site : <a href="http://localhost:3000/"> www.wasalii.com </a> </div> </div>

               </div>
               
               <div style="margin-left : 20px; margin-top:50px; font-size:1.1em; color : #82368C"> <u> Remarque : </u> Wasalii ne prend aucune commission. Vous avez la liberté de fixer vos prix et de les négocier avec vos clients. </div>
                </div>`)

              
      //    res.status(200).send({
          //        data : json
             //     })
                //return res.redirect('https://www.google.fr/');
              }
            
           //res.status(200).send({message : "it exists now bitch slut", variable : result});
          });

          //return  res.redirect('http://localhost:3000/confirmation');
      
        }
   //    
    
              });


              
/*

if( actual_Min - current_minutes >= 0 &&  actual_Min - current_minutes < 03 && todayDate == todaydate) {
    
  const reqsql = `SELECT COUNT(*) AS cnt FROM CommandeClient WHERE Date = ? AND id_client = ?`;

  connection.query(reqsql, [todayDate, idClient],(err, results, fields) => {
       if (err) {
        return console.error(err);
      }
     
    
     else {
         
         if (results[0].cnt <= 0) {
             
                    const sendCommande = `INSERT INTO CommandeClient (id_client, Liste_livreur, Date, Time) VALUES (?,?,?,?)`
              let values = [idClient, finalvector, todayDate, timer];
              
              connection.query(sendCommande, values, (err, result, fields) => {
                   if (err) {
            return console.log(err);
          }

          else {
           return res.status(200).send({message : "it exists now bitch slut", variable : results});
          }
                  
              });
               
               
         }
         
         
         else{
                     const reqsql2 = `SELECT Liste_livreur  FROM CommandeClient WHERE CommandeClient.Date = '${todayDate}'  AND  CommandeClient.id_client = '${idClient}' AND CommandeClient.Time = '${timer}'`

                connection.query(reqsql2, (err, resultt, fields)=>{
                    
                       if (err) {
                       return console.error(err.message);
          }
else {
     arr = JSON.parse(result[0].Liste_livreur) + ","+id;
            arrPotentiel =  JSON.stringify(arr);
            
              const sqlUpDate = 'UPDATE `CommandeClient` SET CommandeClient.Liste_livreur =  ?  WHERE CommandeClient.id_client = ?  AND CommandeClient.Date = ? AND CommandeClient.Time = ?';
            const val = [arrPotentiel, idClient, todayDate, timer];
            
              connection.query(sqlUpDate, val, function (err, result) {
                    if (err) {console.log(err)}
             else { 
                 return res.status(200).send({data : "updaté avec succés"});
       
             } 
                  
              });
            
            
}
                });
                
         }
         
  }
         
          /*
    
           if (results[0].cnt > 0) {
               
               
                arr = JSON.parse(result[0].Liste_livreur) + ","+id;
            arrPotentiel =  JSON.stringify(arr);
                const sqlUpDate = 'UPDATE `CommandeClient` SET CommandeClient.Liste_livreur =  ?  WHERE CommandeClient.id_client = ?  AND CommandeClient.Date = ? AND CommandeClient.Time = ?';
            const val = [arrPotentiel, idClient, todayDate, refTime];
                connection.query(sqlUpDate, val, function (err, result) {
                     if (err) {console.log(err)}
                      else { 
                 return res.status(200).send({data : "updaté avec succés"});
       
             } 
                });
               
               /*
                const reqsql2 = `SELECT Liste_livreur  FROM CommandeClient WHERE CommandeClient.id_client = '${idClient}'  AND CommandeClient.Date = '${todayDate}' AND CommandeClient.Time = '${refTime}'`

                connection.query(reqsql2, (err, result, fields)=>{
                    
                       if (err) {
                       return console.error(err.message);
          }
else {
     arr = JSON.parse(result[0].Liste_livreur) + ","+id;
            arrPotentiel =  JSON.stringify(arr);
            
              const sqlUpDate = 'UPDATE `CommandeClient` SET CommandeClient.Liste_livreur =  ?  WHERE CommandeClient.id_client = ?  AND CommandeClient.Date = ? AND CommandeClient.Time = ?';
            const val = [arrPotentiel, idClient, todayDate, refTime];
            
              connection.query(sqlUpDate, val, function (err, result) {
                    if (err) {console.log(err)}
             else { 
                 return res.status(200).send({data : "updaté avec succés"});
       
             } 
                  
              });
            
            
}
                });
                
                
                
            
                
               
           }
           
        
           else{
              const sendCommande = `INSERT INTO CommandeClient (id_client, Liste_livreur, Date, Time) VALUES (?,?,?,?)`
              let values = [idClient, finalvector, todayDate, refTime];
              
              connection.query(sendCommande, values, (err, results, fields) => {
                   if (err) {
            return console.log(err);
          }

          else {
           return res.status(200).send({message : "it exists now bitch slut", variable : results});
          }
                  
              });
              
           }
     }*/

 });


/*
}

else {
    return res.send("expired hey hhhfggfqqqqkkkuulll");
}



*/

const PORT = process.env.PORT || 2000
app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT))
