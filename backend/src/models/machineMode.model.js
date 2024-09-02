module.exports = function (sequelize, Sequelize) {
    const { DataTypes } = require("sequelize");
    const MachineMode = sequelize.define(
        "machine_modes",
        {
            name: {
                type: DataTypes.STRING,
            },
 
            time: {
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
    MachineMode.sync();

    return MachineMode;
};
