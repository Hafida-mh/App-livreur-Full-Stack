const mysql = require('mysql');


const postConfirmedProfil = (req,res) => {

    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "livreur_DB",
  
   });
   
   connection.connect(function(err) {
    if (err) throw err;
      console.log("Database Confirmed livreur Connected!");
  });
  
  

  
  const Nom = req.body.Nom;
   const id= req.body.id;
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
      const CarteNationale = req.body.CarteNationale;
  
  /* FIND OUT IF THE USER ALREADY EXISTS (later)*/
  
  /* POST DATA*/
  let stmt = `INSERT INTO confirmedProfilLivreur (Nom,Prenom,id,Telephone,Email,Wilaya,Commune,Adresse,Vehicule,Matricule,Permis,Cartegrise,CarteNationale) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  
  let values =[Nom, Prenom, id, Telephone, Email, Wilaya, Commune, Adresse, Vehicule, Matricule, Permis, Cartegrise, CarteNationale];
  
  // execute the insert statment
  connection.query(stmt, values, (err, results, fields) => {
  if (err) {
  return console.error(err.message);
  }
  // get inserted id
  console.log('Todo Id:' + results.insertId);
  });
  

  console.log(Nom);
  connection.end();
  
 
  }



/* Get list confirmed livreurs*/ 


const getConfirmedLivreurs = (req,res) =>{
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "livreur_DB",
     });
    
    
     connection.connect(function(err) {
      if (err) throw err;
       
    });
    
    
    const qr='SELECT * FROM `signup_TB`'
      connection.query('SELECT * FROM `signup_TB`', (err, results, fields) => {
    
    
        var string=JSON.stringify(results);
        var json =  JSON.parse(string);
        
    
        console.log(json)
        res.send({
          data: json

        })
        if (err) {
        return console.error(err.message);
        }
      });
    
    
}








  module.exports={
    postConfirmedProfil,
    getConfirmedLivreurs
  }