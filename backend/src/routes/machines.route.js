"use strict";
const urlname = "machines";
const Controller = require("../controllers/machines.controller");
var router = require("express").Router();

router.get(`/${urlname}/`, Controller.findall);
router.get(`/${urlname}/:id`, Controller.findone);

// ====================== CRUD ======================
router.post(`/${urlname}/`, Controller.create);
router.put(`/${urlname}/:id`, Controller.update);
router.delete(`/${urlname}/:id`, Controller.delete);


module.exports = router;
