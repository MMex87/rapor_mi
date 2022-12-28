const { Sequelize } = require("sequelize")
const db = require("../config/Database.js")

const { DataTypes } = Sequelize


const Kelas = db.define('kelas', {
    kelas: {
        type: DataTypes.STRING
    },
    nama_kelas: {
        type: DataTypes.STRING
    },
    id_guru: {
        type: DataTypes.STRING
    },

}, {
    indexes: [
        {
            fields: ['id_guru']
        }
    ],
    freezeTableName: true
})

module.exports = Kelas