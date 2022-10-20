import { Sequelize } from "sequelize";

const db = new Sequelize('db_rapor', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    define: { freezeTableName: true }
})

export default db