import Users from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { where } from "sequelize";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email', 'role', 'picture']
        })
        res.json(users)
    } catch (error) {
        console.log(error);
    }
}

export const Register = async (req, res) => {
    const { name, email, password, confPassword, role, picture } = req.body

    if (password !== confPassword) return res.status(400)
        .json({ msg: "Password dan Confirm Password tidak cocok" })

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        await Users.create({
            name, email, password: hashPassword, role, picture
        })
        res.json({ msg: "Register Berhasil" })
    } catch (error) {
        console.log(error)
    }
}

export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        })
        const match = await bcrypt.compare(req.body.password, user[0].password)
        if (!match) return res.status(400).json({ msg: "Wrong Password" })
        const userId = user[0].id;
        const name = user[0].name;
        const picture = user[0].picture;
        const role = user[0].role;
        const email = user[0].email;
        const accesstoken = jwt.sign({ userId, name, email, picture, role }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })
        const refreshtoken = jwt.sign({ userId, name, email, picture, role }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1D'
        })
        await Users.update({ refresh_token: refreshtoken }, {
            where: {
                id: userId
            }
        })
        res.cookie('refreshToken', refreshtoken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.json({ accesstoken })
    } catch (error) {
        res.status(404).json({ msg: "Email tidak ditemukan" })
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(204)
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    })
    if (!user[0]) return res.sendStatus(204)
    const userId = user[0].id
    await Users.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    })
    res.clearCookie('refreshToken')
    return res.sendStatus(200)
}
