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
            machine_type_id: {
                type: DataTypes.INTEGER,
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
