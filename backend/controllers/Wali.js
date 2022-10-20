import Wali from "../models/waliModel.js";

export const getWali = async (req, res) => {
    try {
        const wali = await Wali.findAll({
            attributes: ['id', 'nama', 'hubungan_wali', 'id_siswa']
        })
        if (wali === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json(wali)
    } catch (error) {
        console.log(error)
    }
}

export const getWaliId = async (req, res) => {
    try {
        const wali = await Wali.findOne({ where: { id: req.params.id } })
        if (wali === null)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json(wali)
    } catch (error) {
        console.log(error)
    }
}

export const tambahWali = async (req, res) => {
    const { nama, hubungan_wali, id_siswa } = req.body
    try {
        const wali = await Wali.create({
            nama, hubungan_wali, id_siswa
        })
        if (wali === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Ditambahkan" })
    } catch (error) {
        console.log(error);
    }
}

export const editWali = async (req, res) => {
    const { nama, hubungan_wali, id_siswa } = req.body
    try {
        const wali = await Wali.update({
            nama, hubungan_wali, id_siswa
        }, {
            where: {
                id: req.params.id
            }
        })
        if (wali == 0) {
            res.status(404).json({ msg: "Data Tidak di temukan" })
        } else {
            res.json({ msg: "Data Berhasil Di Ubah" })
        }
    } catch (error) {
        console.log(error)
    }
}

export const hapusWali = async (req, res) => {
    try {
        const wali = await Wali.destroy({
            where: {
                id: req.params.id
            }
        })
        if (wali === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Terhapus" })
    } catch (error) {
        console.log(error);
    }
}

