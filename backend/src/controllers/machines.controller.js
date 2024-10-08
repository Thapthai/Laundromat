"use strict";

const db = require("../models/index.model");
const Machines = db.machines;
const Op = db.Sequelize.Op;
const func = db.Sequelize;

Machines.belongsTo(db.branches, { foreignKey: 'branch_id' });

module.exports = {
  findall: async function (req, res) {
    const name = req.query.name;
    const status = req.query.status;
    const limit = req.query.limit;
    const page = req.query.page;

    var conditions = {};
    if (name) conditions.name = { [Op.like]: `%${name}%` };
    if (status) conditions.status = status;
    var lim = limit ? limit : 10;
    var offs = page ? (page - 1) * lim : 0;

    await Machines.findAll({
      where: conditions,
      limit: parseInt(lim, 10),
      offset: parseInt(offs, 0),
      order: [["id", "DESC"]],
      include: [{
        model: db.branches
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
            err.message || "Some error occurred while retrieving machines.",
        });
      });
  },

  findone: async function (req, res) {
    console.log("Viewing " + req.params.id);
    const id = req.params.id;

    await Machines.findByPk(id)
      .then((data) => {
        res.status(200);
        res.send(data);
      })
      .catch((err) => {
        res.status(500);
        res.send({
          message:
            err.message || "Some error occurred while retrieving the machine.",
        });
      });
  },

  create: async function (req, res) {
    var tmpData = {
      name: req.body.name,
      branch_id: req.body.branch_id,  
      start: req.body.start,
      end: req.body.end,
      status: req.body.status,
    };

    await Machines.create(tmpData)
      .then((data) => {
        res.status(200);
        res.send({ status: "created" });
      })
      .catch((err) => {
        res.status(500);
        res.send({
          message:
            err.message || "Some error occurred while creating the machine.",
        });
      });
  },

  delete: async function (req, res) {
    console.log("Delete " + req.params.id);
    const id = req.params.id;

    await Machines.destroy({
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
            err.message || "Some error occurred while deleting the machine.",
        });
      });
  },

  update: async function (req, res) {

    const id = req.params.id;
    var tmpData = {
      name: req.body.name,
      branch_id: req.body.branch_id,
      start: req.body.start,
      end: req.body.end,
      status: req.body.status,

    };

    await Machines.update(tmpData, {
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
            err.message || "Some error occurred while updating the machine.",
        });
      });
  },

};
