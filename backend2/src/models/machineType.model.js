module.exports = function (sequelize, Sequelize) {
    const { DataTypes } = require("sequelize");
    const MachineType = sequelize.define(
        "machine_type",
        {
            name: {
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
    MachineType.sync();

    return MachineType;
};
