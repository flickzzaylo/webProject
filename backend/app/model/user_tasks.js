const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user_tasks', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        task_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'task',
                key: 'id'
            }
        },
        mark: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        file: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        mime_type: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        isComplete: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: false
        }
    });
};
