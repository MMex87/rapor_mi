import Guru from "../models/guruModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import fs from 'fs'

export const getGurus = async (req, res) => {
    try {
        const gurus = await Guru.findAll({
            attributes: ['id', 'nama', 'password', 'jtm', 'nuptk', 'pendidikan', 'tanggal_lahir', 'jenis_kelamin', 'picture', 'role']
        })
        if (gurus === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json(gurus)
    } catch (error) {
        console.log(error)
    }
}

export const getGurusId = async (req, res) => {
    try {
        const gurus = await Guru.findOne({ where: { id: req.params.id } })
        if (gurus === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json(gurus)
    } catch (error) {
        console.log(error)
    }
}

export const getGurusName = async (req, res) => {
    try {
        const gurus = await Guru.findOne({ where: { nama: req.params.nama } })
        if (gurus === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json(gurus)
    } catch (error) {
        console.log(error)
    }
}

export const TambahGuru = async (req, res) => {
    const { nama, username, jtm, nuptk, pendidikan, tanggal_lahir, jenis_kelamin, picture, role } = req.body

    try {
        const gurus = await Guru.create({
            nama, username, jtm, nuptk, pendidikan, tanggal_lahir, jenis_kelamin, picture, role
        })
        if (gurus === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Ditambahkan" })
    } catch (error) {
        console.log(error);
    }
}

export const editGuru = async (req, res) => {
    const { nama, username, jtm, nuptk, pendidikan, tanggal_lahir, jenis_kelamin, picture, role } = req.body

    const gurus = await Guru.findOne({ where: { id: req.params.id } })
    const filepath = '../frontend/public/assets/uploads/' + gurus.picture

    try {
        const guru = await Guru.update({
            nama, username, jtm, nuptk, pendidikan, tanggal_lahir, jenis_kelamin, picture, role
        }, {
            where: {
                id: req.params.id
            }
        })

        if (guru == 0) {
            res.status(404).json({ msg: "Data Tidak di temukan" })
        } else {
            if (picture === gurus.picture) {
            } else {
                fs.unlink(filepath, err => console.log(err))
            }
            res.json({ msg: "Data Berhasil Di Ubah" })
        }
    } catch (error) {
        console.log(error)
    }
}
export const updateGuru = async (req, res) => {
    const { nama, username, password, confPassword, jtm, nuptk, pendidikan, tanggal_lahir, jenis_kelamin, picture, role } = req.body

    const gurus = await Guru.findOne({ where: { id: req.params.id } })
    const filepath = '../frontend/public/assets/uploads/' + gurus.picture

    if (password !== confPassword) return res.status(400)
        .json({ msg: "Password dan Confirm Password tidak cocok" })

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)

    try {
        const guru = await Guru.update({
            nama, username, password: hashPassword, jtm, nuptk, pendidikan, tanggal_lahir, jenis_kelamin, picture, role
        }, {
            where: {
                id: req.params.id
            }
        })

        if (guru == 0) {
            res.status(404).json({ msg: "Data Tidak di temukan" })
        } else {
            if (picture == null) {
                console.log("Tidak Menghapus Gambar")
            } else {
                if (gurus.picture == "default.png") {
                    console.log("default");
                } else {
                    fs.unlink(filepath, err => console.log(err))
                }
            }
            res.json({ msg: "Data Berhasil Di Ubah" })
        }
    } catch (error) {
        console.log(error)
    }
}

export const Login = async (req, res) => {
    try {
        const user = await Guru.findAll({
            where: {
                username: req.body.username
            }
        })
        const match = await bcrypt.compare(req.body.password, user[0].password)
        if (!match) return res.status(400).json({ msg: "Wrong Password" })
        const userId = user[0].id;
        const name = user[0].nama;
        const username = user[0].username;
        const picture = user[0].picture;
        const role = user[0].role;
        const accesstoken = jwt.sign({ userId, name, username, picture, role }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })
        const refreshtoken = jwt.sign({ userId, name, username, picture, role }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1D'
        })
        await Guru.update({ refresh_token: refreshtoken }, {
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
        res.status(404).json({ msg: "Username tidak ditemukan" })
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(204)
    const user = await Guru.findAll({
        where: {
            refresh_token: refreshToken
        }
    })
    if (!user[0]) return res.sendStatus(204)
    const userId = user[0].id
    await Guru.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    })
    res.clearCookie('refreshToken')
    return res.sendStatus(200)
}

export const hapusGuru = async (req, res) => {
    try {
        const guru = await Guru.findOne({ where: { id: req.params.id } })

        const gurus = await Guru.destroy({
            where: {
                id: req.params.id
            }
        })
        if (gurus === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        else {
            const filepath = '../frontend/public/assets/uploads/' + guru.picture

            if (guru.picture == 'default.png') {
                console.log('default');
            } else {
                fs.unlink(filepath, err => console.log(err))
            }
            res.json({ msg: "Data Berhasil Terhapus" })
        }
    } catch (error) {
        console.log(error);
    }
}

