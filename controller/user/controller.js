const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
require("dotenv").config();

// **********  Create connexions to dataBase  ***********




/*  SIGNUP */
const postUser =  async (req, res) => {
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
  const Wilaya = req.body.Wilaya;
  const Commune = req.body.Commune;
  const Adresse = req.body.Adresse;
  const Vehicule = req.body.Vehicule;
  const Matricule = req.body.Matricule;
  const Permis = req.body.Permis;
  const Cartegrise = req.body.Cartegrise;
  const Password = req.body.Password;



  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(Password, salt);
  const hashedPasswordstring = JSON.stringify(hashedPassword);




  /* FIND OUT IF THE USER ALREADY EXISTS (later)*/


  /* POST DATA*/
  let verify = 'SELECT COUNT(*) AS cnt FROM signup_TB WHERE Email = ? ';

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

      let stmt = `INSERT INTO signup_TB (Nom,Prenom,id,Telephone,Email,Wilaya,Commune,Adresse,Vehicule,Matricule,Permis,Cartegrise,Password,Token ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      let values = [Nom, Prenom, id, Telephone, Email, Wilaya, Commune, Adresse, Vehicule, Matricule, Permis, Cartegrise, hashedPasswordstring, token];


      // execute the insert statment
      connection.query(stmt, values, (err, results, fields) => {
        if (err) {
          return console.error(err.message);
        }
        // get inserted id
        return res.send({
          messageError: "",
          messageSuccess: "Inscription réussite"
        });

      
      });

      connection.end();

    }
  });


}



/* GET LIST USERS */


const getUser = (req, res) => {

  const wilaya = req.body.Wilaya;
const vehicule = req.body.Vehicule;
console.log(wilaya)
console.log(vehicule)

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "livreur_DB"
  });


  connection.connect(function (err) {
    if (err) throw err;

  });


  const qr = `SELECT * FROM signup_TB WHERE Wilaya = ${wilaya} AND Vehicule = ${vehicule}`
  connection.query(qr,(err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }


    else{
      var string = JSON.stringify(results);
      var json = JSON.parse(string);
  
     
      //console.log(json)
     return res.status(200).json({
        message : "success",
        data : json
      })
    }
    
   
  });
}



// Check connexion .....

const checkConnexion = (req, res) => {

  const Email = req.body.Email;
  const Password = req.body.Password;


  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "livreur_DB",

  });


  connection.connect(function (err) {
    if (err) throw err;
  });


  let verify = `SELECT COUNT(*) AS cnt FROM signup_TB WHERE email = ? AND password = ?`;

  connection.query(verify, [Email ,Password], (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    else {

      if (results[0].cnt > 0) {
        res.send({
          messageError  : "",
          messageSuccess: "Connexion réussite"
        })
      }
  
      else {
        res.send({
          messageError: "Adresse mail ou mot de passe incorrecte",
          messageSuccess : ""
        })
      }

    }
   
  })
}






// SEND INFORMATION OF LIVREUR


const getLivreurInfo = (req,res) => {
  const id = req.body.id;

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "livreur_DB",

  });


  connection.connect(function (err) {
    if (err) throw err;
  });

  const query = `SELECT * FROM signup_TB  WHERE id = ${id}`
  connection.query(query,id, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }

    else{
      var string = JSON.stringify(results);
      var json = JSON.parse(string);
  
  
      //console.log(json)
     return res.send({
        message : "sucess"
      })
    }
  
  
  });


  
}

module.exports = {
  postUser,
  getUser,
  checkConnexion,
  getLivreurInfo
}