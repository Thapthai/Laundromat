module.exports = function (sequelize, Sequelize) {
    const { DataTypes } = require("sequelize");
    const Users = sequelize.define(
        "users",
        {
            name: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
            },

            password: {
                type: DataTypes.STRING,
            },
            role: {
                type: DataTypes.STRING,
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
    Users.sync();

    return Users;
};
