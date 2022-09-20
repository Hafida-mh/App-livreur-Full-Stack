const express = require("express");
const routerControllUsers = express.Router();
const ControllerLivreur = require('../confirmedLivreur/Controller')



routerControllUsers.post('/confirmedLivreur', ControllerLivreur.postConfirmedProfil);
routerControllUsers.get('/getconfirmedLivreur', ControllerLivreur.getConfirmedLivreurs);

module.exports = routerControllUsers;