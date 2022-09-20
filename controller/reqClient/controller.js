const mysql = require('mysql');



 const analyseReqClient = (req, res) => {


  const EmailClient = req.body.EmailClient;
  const TimeSend =req.body.TimeSend;
  const DateSend  = req.body.DateSend




    // CALL DATA BASE 
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


/*
      const current_minutes = date.getMinutes();
      const current_hours = date.getHours();

      const emailClient = req.body.EmailClient;

      const date = new Date();

      const todayDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
      const Todaytime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      const timeSup = todayDate+' '+ date.getHours() + ":" + (date.getMinutes()+1) + ":" + date.getSeconds();
      const timeInf = todayDate+' '+ date.getHours() + ":" + (date.getMinutes() -1)+ ":" + date.getSeconds();
  
  
  
  
  */
  
  

  
      const sql = `SELECT *  FROM CommandeClient WHERE CommandeClient.id_client = ${EmailClient} AND CommandeClient.Time = ${TimeSend} AND CommandeClient.Date <= ${DateSend}`

    connection.query(sql, (err, results, fields) => {
        if (err) {
          return console.error(err.message);
        }
       
        else{
          return    res.status(200).send({
            message : "success"
        })
        }
   /*     
if(results != []) {
  return    res.status(200).send({
    data : results,
    successMessage : "on a trouvé des livreurs"
})
}
     
  else{
    return    res.status(200).send({
      data : results,
      errorMessage : "Aucun livreur n'est disponible"
  })
  }
    */






      })





    console.log("hello there")
 }

module.exports = {
    analyseReqClient
}