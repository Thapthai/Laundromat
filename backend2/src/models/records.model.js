module.exports = function (sequelize, Sequelize) {
    const { DataTypes } = require("sequelize");
    const Records = sequelize.define(
        "records",
        {
            machine_id: {
                type: DataTypes.INTEGER,
            },
            user_id: {
                type: DataTypes.INTEGER,
            },
            start: {
                type: DataTypes.INTEGER,
            },
            end: {
                type: DataTypes.DATE,
            },
            status: {
                type: DataTypes.DATE,
            },
        },
        {
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );
    Records.sync();

    return Records;
};
