const express = require("express");
const routerControllerClient = express.Router();
const controllerClient = require('../clients/controller');



routerControllerClient.post('/signup', controllerClient.signup );
routerControllerClient.post('/connexion', controllerClient.checkConnexionClient);
routerControllerClient.put('/upDateNumber', controllerClient.upDateNumber);
routerControllerClient.post('/password', controllerClient.getForgottenPassword);
routerControllerClient.post('/clientInfo', controllerClient.getClientInfo);
routerControllerClient.post('/upDatInfo', controllerClient.upDateInfo);
routerControllerClient.post('/saveSearch', controllerClient.saveSearch);
routerControllerClient.post('/getreport', controllerClient.getReport);
routerControllerClient.post('/signal', controllerClient.signalerLivreur);
routerControllerClient.post('/googlesignin', controllerClient.signinGoogle);
module.exports = routerControllerClient;