const express = require("express");
const routerControllUsers = express.Router();
const controllUser = require('../user/controller');



routerControllUsers.post('/signup',controllUser.postUser);
routerControllUsers.post('/getListUser',controllUser.getUser);
routerControllUsers.post('/connexion', controllUser.checkConnexion);
routerControllUsers.post('/getContact', controllUser.getLivreurInfo)
module.exports = routerControllUsers;

