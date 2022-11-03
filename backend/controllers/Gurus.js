import Guru from "../models/guruModel.js";

export const getGurus = async (req, res) => {
    try {
        const gurus = await Guru.findAll({
            attributes: ['id', 'nama', 'jtm', 'nuptk', 'pendidikan', 'tanggal_lahir', 'picture', 'role']
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

export const tambahGuru = async (req, res) => {
    const { nama, jtm, nuptk, pendidikan, tanggal_lahir, picture, role } = req.body
    try {
        const gurus = await Guru.create({
            nama, jtm, nuptk, pendidikan, tanggal_lahir, picture, role
        })
        if (gurus === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Ditambahkan" })
    } catch (error) {
        console.log(error);
    }
}

export const editGuru = async (req, res) => {
    const { nama, jtm, nuptk, pendidikan, tanggal_lahir, picture, role } = req.body
    try {
        const guru = await Guru.update({
            nama, jtm, nuptk, pendidikan, tanggal_lahir, picture, role
        }, {
            where: {
                id: req.params.id
            }
        })
        if (guru == 0) {
            res.status(404).json({ msg: "Data Tidak di temukan" })
        } else {
            res.json({ msg: "Data Berhasil Di Ubah" })
        }
    } catch (error) {
        console.log(error)
    }
}

export const hapusGuru = async (req, res) => {
    try {
        const gurus = await Guru.destroy({
            where: {
                id: req.params.id
            }
        })
        if (gurus === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Terhapus" })
    } catch (error) {
        console.log(error);
    }
}

