module.exports = function (sequelize, Sequelize) {
    const { DataTypes } = require("sequelize");
    const Branches = sequelize.define(
        "branches",
        {
            name: {
                type: DataTypes.STRING,
            },
            location: {
                type: DataTypes.STRING,
            },
            GPS: {
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
    Branches.sync();

    return Branches;
};
