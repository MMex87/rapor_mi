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

export const TambahGuru = async (req, res) => {
    const { nama, jtm, nuptk, pendidikan, tanggal_lahir, jenis_kelamin, picture, role } = req.body

    try {
        const gurus = await Guru.create({
            nama, jtm, nuptk, pendidikan, tanggal_lahir, jenis_kelamin, picture, role
        })
        if (gurus === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Ditambahkan" })
    } catch (error) {
        console.log(error);
    }
}

export const editGuru = async (req, res) => {
    const { nama, jtm, nuptk, pendidikan, tanggal_lahir, jenis_kelamin, picture, role } = req.body

    const gurus = await Guru.findOne({ where: { id: req.params.id } })
    const filepath = '../frontend/public/assets/uploads/' + gurus.picture

    try {
        const guru = await Guru.update({
            nama, jtm, nuptk, pendidikan, tanggal_lahir, jenis_kelamin, picture, role
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
    const { nama, password, confPassword, jtm, nuptk, pendidikan, tanggal_lahir, jenis_kelamin, picture, role } = req.body

    const gurus = await Guru.findOne({ where: { id: req.params.id } })
    const filepath = '../frontend/public/assets/uploads/' + gurus.picture

    if (password !== confPassword) return res.status(400)
        .json({ msg: "Password dan Confirm Password tidak cocok" })

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)

    try {
        const guru = await Guru.update({
            nama, password: hashPassword, jtm, nuptk, pendidikan, tanggal_lahir, jenis_kelamin, picture, role
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

