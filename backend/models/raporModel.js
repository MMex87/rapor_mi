import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize

const Rapor = db.define('rapor', {
    angkatan: { type: DataTypes.STRING },
    semester: { type: DataTypes.STRING },
    id_siswa: { type: DataTypes.INTEGER },
    id_kelas: { type: DataTypes.INTEGER },
}, {
    indexes: [
        {
            fields: ['id_siswa']
        },
        {
            fields: ['id_kelas']
        }
    ]
})

export default Rapor