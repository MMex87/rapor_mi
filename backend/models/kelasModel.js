import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize


const Kelas = db.define('kelas', {
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

export default Kelas