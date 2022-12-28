const Rapor = require("../models/raporModel.js")

const getRapor = async (req, res) => {
    try {
        const rapor = await Rapor.findAll({
            attributes: ["id", "angkatan", "semester", "jenis_rapor", "id_siswa", "id_kelas"]
        })
        if (rapor === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json(rapor)
    } catch (error) {
        console.log(error)
    }
}

const getRaporId = async (req, res) => {
    try {
        const rapor = await Rapor.findOne({ where: { id: req.params.id } })
        if (rapor === null)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json(rapor)
    } catch (error) {
        console.log(error)
    }
}

const getRaporIdSiswa = async (req, res) => {
    try {
        const rapor = await Rapor.findOne({
            where: {
                id_kelas: req.params.idKelas,
                id_siswa: req.params.idSiswa,
                jenis_rapor: req.params.jenisR,
                semester: req.params.semester
            }
        })
        if (rapor === null)
            res.status(404).json({ msg: "Data Tidak di Temukan" })
        res.json(rapor)
    } catch (error) {
        console.log(error);
    }
}

const tambahRapor = async (req, res) => {
    const { angkatan, semester, jenis_rapor, id_siswa, id_kelas } = req.body
    try {
        const rapor = await Rapor.create({
            angkatan, semester, jenis_rapor, id_siswa, id_kelas
        })
        if (rapor === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Ditambahkan" })
    } catch (error) {
        console.log(error);
    }
}

const editRapor = async (req, res) => {
    const { angkatan, semester, jenis_rapor, id_siswa, id_kelas } = req.body
    try {
        const rapor = await Rapor.update({
            angkatan, semester, jenis_rapor, id_siswa, id_kelas
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

const hapusRapor = async (req, res) => {
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

module.exports = {
    getRapor,
    getRaporId,
    getRaporIdSiswa,
    tambahRapor,
    hapusRapor,
    editRapor
}