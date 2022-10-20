import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import db from "./config/Database.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import Users from "./models/userModel.js";

dotenv.config()
const app = express()
const port = 7000;

try {
    await db.authenticate()
    console.log("Database Connected");
    // await Users.sync()
} catch (error) {
    console.log(error)
}

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(cookieParser())
app.use(express.json())
app.use(router)


app.listen(port, () => console.log(`Server running at port ${port}`))