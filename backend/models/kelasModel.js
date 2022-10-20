import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize


const Kelas = db.define('kelas', {
    nama_kelas: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
})

export default Kelas