const express = require("express");
const routerControlClientReq = express.Router();
const controllerReqClient = require('../reqClient/controller');


routerControlClientReq.post('/search', controllerReqClient.analyseReqClient);





module.exports = routerControlClientReq;

