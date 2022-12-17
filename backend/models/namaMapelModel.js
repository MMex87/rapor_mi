import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Mapel from "./mapelModel.js";

const { DataTypes } = Sequelize

const NamaMapel = db.define('nama_mapel', {
    nama: { type: DataTypes.STRING },
    induk: { type: DataTypes.STRING },
}, {
    freezeTableName: true
})


export default NamaMapel