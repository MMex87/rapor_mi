import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize

const Guru = db.define('guru', {
    nama: {
        type: DataTypes.STRING
    },
    jtm: {
        type: DataTypes.STRING
    },
    nuptk: {
        type: DataTypes.STRING
    },
    id_kelas: {
        type: DataTypes.STRING
    },
    pendidikan: {
        type: DataTypes.STRING,
    },
    tanggal_lahir: {
        type: DataTypes.DATE
    },
    picture: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING
    }
},
    {
        indexes: [
            {
                fields: ['id_kelas']
            }
        ]
    })

export default Guru