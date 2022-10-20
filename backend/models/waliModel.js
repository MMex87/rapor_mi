import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize

const Wali = db.define('wali', {
    nama: { type: DataTypes.STRING },
    hubungan_wali: { type: DataTypes.STRING },
    id_siswa: { type: DataTypes.INTEGER }
}, {
    indexes: [
        {
            fields: ['id_siswa']
        }
    ]
})

export default Wali