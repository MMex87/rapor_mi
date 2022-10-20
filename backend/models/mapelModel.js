import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize

const Mapel = db.define('mapel', {
    nama: { type: DataTypes.STRING },
    induk: { type: DataTypes.STRING }
}, {
    freezeTableName: true
})

export default Mapel