"use strict";

const db = require("../models/index.model");
const Branches = db.branches;
const Op = db.Sequelize.Op;
const func = db.Sequelize;

Branches.hasMany(db.machines, { foreignKey: 'branch_id' });

module.exports = {
  findall: async function (req, res) {
    const name = req.query.name;
    const location = req.query.location;
    const GPS = req.query.GPS;
    const status = req.query.status;

    const limit = req.query.limit;
    const page = req.query.page;

    var conditions = {};
    if (name) conditions.name = { [Op.like]: `%${name}%` };
    if (location) conditions.location = { [Op.like]: `%${location}%` };
    if (GPS) conditions.GPS = { [Op.like]: `%${GPS}%` };
    if (status) conditions.status = status;

    var lim = limit ? limit : 10;
    var offs = page ? (page - 1) * lim : 0;

    await Branches.findAll({
      where: conditions,
      limit: parseInt(lim, 10),
      offset: parseInt(offs, 0),
      order: [["id", "DESC"]],
      include: [{
        model: db.machines,
      }]
    })
      .then((data) => {
        res.status(200);
        res.send(data);
      })
      .catch((err) => {
        res.status(500);
        res.send({
          message:
            err.message || "Some error occurred while retrieving branches.",
        });
      });
  },
 

  findone: async function (req, res) {
    console.log("Viewing " + req.params.id);
    const id = req.params.id;

    await Branches.findByPk(id)
      .then((data) => {
        res.status(200);
        res.send(data);
      })
      .catch((err) => {
        res.status(500);
        res.send({
          message:
            err.message || "Some error occurred while retrieving the branch.",
        });
      });
  },

  create: async function (req, res) {
    var tmpData = {
      name: req.body.name,
      location: req.body.location,
      GPS: req.body.GPS,
      status: req.body.status,
    };

    await Branches.create(tmpData)
      .then((data) => {
        res.status(200);
        res.send({ status: "created" });
      })
      .catch((err) => {
        res.status(500);
        res.send({
          message:
            err.message || "Some error occurred while creating the branch.",
        });
      });
  },

  delete: async function (req, res) {
    console.log("Delete " + req.params.id);
    const id = req.params.id;

    await Branches.destroy({
      where: { id: id },
    })
      .then(() => {
        res.status(200);
        res.send({ status: "deleted" });
      })
      .catch((err) => {
        res.status(500);
        res.send({
          message:
            err.message || "Some error occurred while deleting the branch.",
        });
      });
  },

  update: async function (req, res) {
    console.log("Todo " + req.params.id + " updated");
    const id = req.params.id;
    var tmpData = {
      name: req.body.name,
      location: req.body.location,
      GPS: req.body.GPS,
      status: req.body.status,

    };

    await Branches.update(tmpData, {
      where: { id: id },
    })
      .then((data) => {
        res.status(200);
        res.send({ status: "updated" });
      })
      .catch((err) => {
        res.status(500);
        res.send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  },

};
