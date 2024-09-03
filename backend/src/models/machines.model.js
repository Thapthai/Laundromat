module.exports = function (sequelize, Sequelize) {
    const { DataTypes } = require("sequelize");
    const Machines = sequelize.define(
        "machines",
        {
            name: {
                type: DataTypes.STRING,
            },
            branch_id: {
                type: DataTypes.INTEGER,
            },
            start: {
                type: DataTypes.TIME,
            },
            end: {
                type: DataTypes.TIME,
            },
            status: {
                type: DataTypes.STRING,
            },
        },
        {
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );
    Machines.sync();

    return Machines;
};
