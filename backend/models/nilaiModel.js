import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize

const Nilai = db.define('nilai', {
    nilai: { type: DataTypes.INTEGER },
    id_jenis_nilai: { type: DataTypes.INTEGER },
    jenis_nilai: { type: DataTypes.STRING },
    id_siswa: { type: DataTypes.INTEGER },
    id_mapel: { type: DataTypes.INTEGER }
}, {
    indexes: [
        {
            fields: ['id_siswa'],
            fields: ['id_mapel']
        }
    ]
})

export default Nilai