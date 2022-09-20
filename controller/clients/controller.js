const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
require("dotenv").config();



//signup



const signup = async (req, res) => {
  // connect BDD

  try {

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

    const id = req.body.id;
    const Nom = req.body.Nom;
    const Prenom = req.body.Prenom;
    const Telephone = req.body.Telephone;
    const Email = req.body.Email;
    const Statut = req.body.Statut;
    const Password = req.body.Password
    const Adress = req.body.Adress
    console.log(Password)
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(Password, salt);
    const hashedPasswordstring = JSON.stringify(hashedPassword);

    let verify = 'SELECT COUNT(*) AS cnt FROM signupClient_TB WHERE Email = ?';

    connection.query(verify, [Email], (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }

      else if (results[0].cnt > 0) {
        res.send({
          messageSuccess: "",
          messageError: "Adresse mail existe déja"

        })

      }


      else {

        const token = jwt.sign({ Email: req.body.Email, Password: req.body.Password }, process.env.ACCESS_TOKEN_SECRET);

        //  const hashedPasswordstring= JSON.stringify(hashedPassword);
        //console.log(hashedPassword)
        //const Unik = 'NULL'

        //console.log(hashedPasswordstring)
        let stmt = "INSERT INTO `signupClient_TB`(id, Nom, Prenom, Telephone, Adress, Email, Statut, Password, Token) VALUES (?,?,?,?,?,?,?,?,?)";
        let values = [id, Nom, Prenom, Telephone, Adress, Email, Statut, hashedPasswordstring, token];


        // execute the insert statment
        connection.query(stmt, values, (err, result, fields) => {
          if (err) {
            return console.error(err.message);
          }
          // get inserted id
          //console.log(results)


          res.status(200).send({
            messageError: "",
            messageSuccess: "Inscription réussite",
            data: result[0],
            email : Email
          });

          // console.log('Todo Id:' + results.insertId);
        });


        connection.end();

      }



    });

  } catch (error) {
    console.log(error)
  }

}






/*
const verifyPassword = async (pwreq,pwBDD) => {
  const validpass =  await bcrypt.compare(pwreq, pwBDD);
  return validpass
}
async function  verifyPassword(pwreq,pwBDD){
  const validpass =  await bcrypt.compare(pwreq, pwBDD);
  return validpass
}
*/


// salt : $2a$10$I.D0Svy.Xq0mv3/c6m.2/.



//SignIn with google


const signinGoogle = (req, res) => {
  const Email = req.body.Email;

console.log(Email)
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "livreur_DB",
    port: "3306"
  });


  connection.connect(function (err) {
    if (err) throw err;
  });


  let verify = `SELECT COUNT(*) AS cnt FROM signupClient_TB WHERE email = ?`;

      connection.query(verify, [Email], (err, results, fields) => {
      if (err) {
      return console.error(err.message);
     }

     else if (results[0].cnt > 0) {

     
          return res.send({
            messageError: "",
            messageSuccess: "Connexion réussite",
            data: results


          })
        }

        else {

          return res.send({
            messageError: "Adresse mail ou mot de passe incorrecte",
            messageSuccess: ""
          });

        }
      })
    }


  

  



















// SignIn

const checkConnexionClient = async (req, res) => {

  const Email = req.body.Email;
  const Password = req.body.Password;
  const salt = await bcrypt.genSalt(10);

  //console.log(Password)

  // const validpass = await bcrypt.compare(req.body.password, user.password);

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "livreur_DB",
    port: "3306"
  });


  connection.connect(function (err) {
    if (err) throw err;
  });


  let verify = `SELECT COUNT(*) AS cnt FROM signupClient_TB WHERE email = ?`;

  connection.query(verify, [Email, Password], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }

    else if (results[0].cnt > 0) {

      connection.query(`SELECT Password, Email, Token from signupClient_TB WHERE  signupClient_TB.Email="${Email}"`, (err, result, fields) => {

        // var string=JSON.stringify(results[0].Password);
        //  var json =  JSON.parse(string);
        // console.log(results[0].Password)
        // console.log(req.body.Password)

        // const validpass =   bcrypt.compareSync(results[0].Password, req.body.Password );
        // * console.log(result)

        const verified = jwt.verify(result[0].Token, process.env.ACCESS_TOKEN_SECRET)
        // * console.log(verified)

        //console.log(verified.Password)
        //   const validpass  =   verifyPassword(req.body.password, json)

        if (verified.Email === req.body.Email && verified.Password === req.body.Password) {
          return res.send({
            messageError: "",
            messageSuccess: "Connexion réussite",
            data: verified


          })
        }

        else {

          return res.send({
            messageError: "Adresse mail ou mot de passe incorrecte",
            messageSuccess: ""
          });

        }
      })
    }


    else {
      return res.send({
        messageError: "Veuillez vos inscrirre",
        messageSuccess: ""
      })
    }

  })


  /*
  
   // DETERMINER LE MOT DE PASSE CORRESPONANT à L'EMAIL
    connection.query(`SELECT Password from signupClient_TB WHERE  signupClient_TB.Email="${Email}"`, (err, results, fields) => {
  
             if (err) {
              return console.error(err.message);
             }
                                                                                                         
             else {
              const validpass = bcrypt.compare(req.body.password, results[0].Password);
  
              if (!validpass) {
                res.send({
                  messageError: "Mot de passe incorrect",
                  messageSuccess: ""
                })
              }
  
  
              else {
                const token = jwt.sign({ Email: results[0].Email }, process.env.ACCESS_TOKEN_SECRET);
  
                const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
                res.send({
                  messageError: "",
                  messageSuccess: "Connexion réussite",
                  pass: verified
                });
  
              }
  
              // console.log(results[0].Password)
             }
  
          }
    connection.query(verify, [Email, Password], (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
  
      else {
  
  
  
        if (results[0].cnt > 0) {
          connection.query(`SELECT Password, Email from signupClient_TB WHERE signupClient_TB.Password ="${Password}" AND signupClient_TB.Email="${Email}"`, (err, results, fields) => {
  
             if (err) {
              return console.error(err.message);
             }
                                                                                                         
             else {
              const validpass = bcrypt.compare(req.body.password, results[0].Password);
  
              if (!validpass) {
                res.send({
                  messageError: "Mot de passe incorrect",
                  messageSuccess: ""
                })
              }
  
  
              else {
                const token = jwt.sign({ Email: results[0].Email }, process.env.ACCESS_TOKEN_SECRET);
  
                const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
                res.send({
                  messageError: "",
                  messageSuccess: "Connexion réussite",
                  pass: verified
                });
  
              }
  
              // console.log(results[0].Password)
             }
  
          })
        }
      }
    })*/
}





// *****************************************************   UPDATE NUMBER **************************************

const upDateNumber = (req, res) => {
  const id = req.body.id


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


  //SELECT * FROM signup_TB WHERE signup_TB.id = "${id}"

  connection.query(`UPDATE signupClient_TB SET signupClient_TB.Statut= 'playyard' WHERE signupClient_TB.id = '7129f714-5e34-45d5-a395-d202361d363f'`, function (err, result) {
    if (err) throw err;
    // console.log(result);
  });

  const crypto = require('crypto');
  const key = crypto.randomBytes(32).toString('hex')
  // console.log(key)
}



/* Get pass word */

const getForgottenPassword = (req, res) => {
  const email = req.body.Email;
  // console.log(email)

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

  let verify = 'SELECT COUNT(*) AS cnt FROM signupClient_TB WHERE Email = ?';



  connection.query(verify, [email], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }

    else if (results[0].cnt > 0) {

      let selection = `SELECT Password, Token, Nom from signupClient_TB WHERE  signupClient_TB.Email= ?`

      connection.query(selection, [email], (err, relt, field) => {
        if (err) {
          return console.error(err.message);
        }
        else {
          const verified = jwt.verify(relt[0].Token, process.env.ACCESS_TOKEN_SECRET);




          let transporter = nodemailer.createTransport({
            host: 'mail.centre-laseresthetique.com',  /*smtp.ethereal.email */
            port: 465,
            auth: {
              user: 'centrelaser@centre-laseresthetique.com',
              pass: 'centrelaser'
            }
          });


          let mailOption = {
            from: 'centrelaser@centre-laseresthetique.com',
            to: "mechkour.hafida16@gmail.com",
            subject: "Mot de passe compte Wassaly",
            //  html : `<h1> Hi this is a test </h1>`
            html: `<div> Bonjour ${relt[0].Nom}, </div>  <div style="color : red"> Votre mot de passe est le suivant : ${verified.Password} </div> <div> Cliquez sur ce lien pour revenir au site web  : http://localhost:3000/connexionClient</div>`
          }

          // send mail with defined transport object
          transporter.sendMail(mailOption, function (error, info) {
            if (error) {
              return res.status(400).json({
                message: error
              });
            }

            else {

              return res.status(200).json({
                mesg: "message envoyé avec succes"
              });


            }
          });





          return res.send({

            message: "Mot de passe envoyé, vérifiez votre boite mail"
          })
        }
      });





    }

    else {
      return res.send({
        message: "Vous n'êtes pas inscrit"
      })
    }
  });


}



const getClientInfo = (req, res) => {
  const email = req.body.Email;
  console.log(email)
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


  let verify = 'SELECT Nom, Prenom, Telephone, Email, Statut, Adress, id FROM signupClient_TB WHERE Email = ?';

  connection.query(verify, [email], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }

    else {

      console.log(results)
      return res.status(200).json({
        message: "success",
        data: results[0]
      })
    }
  });
}





const upDateInfo = (req, res) => {
  const Email = req.body.Email;
  const Telephone =   req.body.Telephone;
  const Adress = req.body.Adress;
  const nom = req.body.Nom;
  const Prenom = req.body.Prenom;
  const Password = req.body.Password;
  const Statut = req.body.Statut;
  const id = req.body.Id
  console.log(Statut);
  console.log(Telephone)
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


  const updt = `UPDATE signupClient_TB SET signupClient_TB.Nom = ?,  signupClient_TB.Prenom = ?, signupClient_TB.Adress = ?,  signupClient_TB.Email = ?, signupClient_TB.Telephone = ?, signupClient_TB.Statut = ?, signupClient_TB.Password = ? WHERE signupClient_TB.id = ?`;
  connection.query(updt, [nom, Prenom, Adress, Email, Telephone, Statut, Password, id], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }

    else {
      console.log("bitch")
      return res.send({
        message: "Informations mises à jour avec succés",
        data : results

      });


    }

  });

}





/*** SAVE THE SEARCH */


const saveSearch = (req, res) => {
  const potentialLivreurId = req.body.VectorIdLivreur;
  const idClient = req.body.idClient;
  const todayDate = new Date().toISOString().split("T")[0];
  const timer = new Date().toISOString().split("T")[1]

  console.log(idClient);
  console.log(potentialLivreurId);
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

  const sendCommande = `INSERT INTO CommandeClient (id_client, Liste_livreur, Date, Time) VALUES (?,?,?,?)`;
  let values = [idClient, potentialLivreurId, todayDate, timer];



  connection.query(sendCommande, values, (err, result, fields) => {
    if (err) {
      return console.log(err);
    }

    else {
      return res.send({
        message: "success"
      })
    }
  })



}






// get repport of all search of client

const getReport = (req, res, next) => {
  const idClient = req.body.idClient;
  console.log("id client " + idClient)
  var kk = [];

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


  let verify = 'SELECT Liste_livreur FROM `CommandeClient` WHERE id_client = ?';
  connection.query(verify, [idClient], (err, result, fields) => {
    if (err) {
      return console.log(err);

    }

    else {
      //   console.log(result);

      var tt = JSON.parse(result[0].Liste_livreur)


      for (let i = 1; i < tt.length; i++) {
        let reqId = `SELECT Nom, Prenom, Telephone FROM signup_TB WHERE  id = ?`;

        connection.query(reqId, [tt[i]], (err, resultss, fieldss) => {
          if (err) {
            return console.log(err);
          }
          else {
            kk.push(resultss);
            //    console.log(resultss)
          }


          if (i === tt.length - 1) {
            return res.send({
              data: kk,
              suite: result
            })
          }
        })








      }





    }
  })

}


const signalerLivreur = (req, res) => {
  const phone = req.body.Phone;
  const idClient = req.body.Client
  console.log(phone)
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

  let verify = `SELECT COUNT(*) AS cnt FROM signup_TB WHERE Telephone = ${phone} `;
  connection.query(verify, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }

    else {
      console.log(results[0].cnt)
      if (results[0].cnt === 0) {
        return res.send({
          message: "Livreur n'existe pas"
        })
      }


      else {
        let sendPhone = "INSERT INTO `Livreursignal` (id_Client, Telephone_livreur) VALUES (?,?)"
        connection.query(sendPhone, [idClient, phone], (err, result, fields) => {
          if (err) {
            return console.log(err);
          }

          else {
            return res.send({
              message: "Livreur signalé avec succés"
            })
          }
        })


      }

    }
  })

}


module.exports = {
  signup,
  checkConnexionClient,
  upDateNumber,
  getForgottenPassword,
  getClientInfo,
  upDateInfo,
  saveSearch,
  getReport,
  signalerLivreur,
  signinGoogle
}



