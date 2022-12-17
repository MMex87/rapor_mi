import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import NamaMapel from "./namaMapelModel.js";

const { DataTypes } = Sequelize

const Mapel = db.define('mapel', {
    kkm: { type: DataTypes.STRING },
    idGuru: { type: DataTypes.INTEGER },
    id_kelas: { type: DataTypes.INTEGER },
    id_NMapel: { type: DataTypes.INTEGER }
}, {
    indexes: [
        {
            fields: ['idGuru'],
            fields: ['id_kelas'],
            fields: ['id_NMapel']
        }
    ],
    freezeTableName: true
})

Mapel.hasOne(NamaMapel, { foreignKey: 'id' })
Mapel.belongsTo(NamaMapel, { foreignKey: 'id' })

export default Mapel