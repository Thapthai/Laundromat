"use strict";

const db = require("../models/index.model");
const Notifications = db.notifications;
const Op = db.Sequelize.Op;
const func = db.Sequelize;

module.exports = {
  findall: async function (req, res) {
    const name = req.query.code;
    const limit = req.query.limit;
    const page = req.query.page;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    var lim = limit ? limit : 10;
    var offs = page ? (page - 1) * lim : 0;

    await Notifications.findAll({
      where: condition,
      limit: parseInt(lim, 10),
      offset: parseInt(offs, 0),
      order: [["id", "DESC"]],
    })
      .then((data) => {
        res.status(200);
        res.send(data);
      })
      .catch((err) => {
        res.status(500);
        res.send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  },

  findone: async function (req, res) {
    console.log("Viewing " + req.params.id);
    const id = req.params.id;

    await Notifications.findByPk(id)
      .then((data) => {
        res.status(200);
        res.send(data);
      })
      .catch((err) => {
        res.status(500);
        res.send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  },

  create: async function (req, res) {
    var tmpData = {
      machine_id: req.body.machine_id,
      user_id: req.body.user_id,
      record_id: req.body.record_id,
      message: req.body.message,
      status: req.body.status,
    };

    await Notifications.create(tmpData)
      .then((data) => {
        res.status(200);
        res.send({ status: "created" });
      })
      .catch((err) => {
        res.status(500);
        res.send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  },

  delete: async function (req, res) {
    console.log("Delete " + req.params.id);
    const id = req.params.id;

    await Notifications.destroy({
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
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  },

  update: async function (req, res) {
    console.log("Todo " + req.params.id + " updated");
    const id = req.params.id;
    var tmpData = {
      machine_id: req.body.machine_id,
      user_id: req.body.user_id,
      record_id: req.body.record_id,
      message: req.body.message,
      status: req.body.status,
    };

    await Notifications.update(tmpData, {
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
