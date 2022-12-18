import Users from "../models/userModel.js";
import jwt from "jsonwebtoken"
import Guru from "../models/guruModel.js";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.sendStatus(401)
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        })
        if (!user[0]) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403)
            const userId = user[0].id
            const name = user[0].name
            const picture = user[0].picture
            const role = user[0].role
            const email = user[0].email
            const accessToken = jwt.sign({ userId, name, email, picture, role }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            })
            res.json({ accessToken })
        })
    } catch (err) {
        console.log(err)
    }
}

export const refreshTokenGuru = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.sendStatus(401)
        const user = await Guru.findAll({
            where: {
                refresh_token: refreshToken
            }
        })
        if (!user[0]) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403)
            const userId = user[0].id
            const nama = user[0].nama
            const picture = user[0].picture
            const role = user[0].role
            const jtm = user[0].jtm
            const accessToken = jwt.sign({ userId, nama, picture, role, jtm }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            })
            res.json({ accessToken })
        })
    } catch (err) {
        console.log(err)
    }
}