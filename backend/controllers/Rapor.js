import Rapor from "../models/raporModel.js";

export const getRapor = async (req, res) => {
    try {
        const rapor = await Rapor.findAll({
            attributes: ["id", "angkatan", "semester", "id_siswa", "id_mapel", "id_kelas"]
        })
        if (rapor === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json(rapor)
    } catch (error) {
        console.log(error)
    }
}

export const getRaporId = async (req, res) => {
    try {
        const rapor = await Rapor.findOne({ where: { id: req.params.id } })
        if (rapor === null)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json(rapor)
    } catch (error) {
        console.log(error)
    }
}

export const tambahRapor = async (req, res) => {
    const { angkatan, semester, id_siswa, id_mapel, id_kelas } = req.body
    try {
        const rapor = await Rapor.create({
            angkatan, semester, id_siswa, id_mapel, id_kelas
        })
        if (rapor === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Ditambahkan" })
    } catch (error) {
        console.log(error);
    }
}

export const editRapor = async (req, res) => {
    const { angkatan, semester, id_siswa, id_mapel, id_kelas } = req.body
    try {
        const rapor = await Rapor.update({
            angkatan, semester, id_siswa, id_mapel, id_kelas
        }, {
            where: {
                id: req.params.id
            }
        })
        if (rapor == 0) {
            res.status(404).json({ msg: "Data Tidak di temukan" })
        } else {
            res.json({ msg: "Data Berhasil Di Ubah" })
        }
    } catch (error) {
        console.log(error)
    }
}

export const hapusRapor = async (req, res) => {
    try {
        const rapor = await Rapor.destroy({
            where: {
                id: req.params.id
            }
        })
        if (rapor === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Terhapus" })
    } catch (error) {
        console.log(error);
    }
}

