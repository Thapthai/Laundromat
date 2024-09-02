module.exports = function (sequelize, Sequelize) {
    const { DataTypes } = require("sequelize");
    const Notifications = sequelize.define(
        "notifications",
        {
            machine_id: {
                type: DataTypes.STRING,
            },
            user_id: {
                type: DataTypes.STRING,
            },
            record_id: {
                type: DataTypes.STRING,
            },
            message: {
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
    Notifications.sync();

    return Notifications;
};
