import Siswa from "../models/siswaModel.js";

export const getSiswa = async (req, res) => {
    try {
        const siswa = await Siswa.findAll({
            attributes: ['id', 'nisn', 'nama', 'tanggal_lahir', 'jenis_kelamin', 'id_kelas']
        })
        if (siswa === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json(siswa)
    } catch (error) {
        console.log(error)
    }
}

export const getSiswaId = async (req, res) => {
    try {
        const siswa = await Siswa.findOne({ where: { id: req.params.id } })
        if (siswa === null)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json(siswa)
    } catch (error) {
        console.log(error)
    }
}

export const tambahSiswa = async (req, res) => {
    const { nisn, nama, tanggal_lahir, jenis_kelamin, id_kelas } = req.body
    try {
        const siswa = await Siswa.create({
            nisn, nama, tanggal_lahir, jenis_kelamin, id_kelas
        })
        if (siswa === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Ditambahkan" })
    } catch (error) {
        console.log(error);
    }
}

export const editSiswa = async (req, res) => {
    const { nisn, nama, tanggal_lahir, jenis_kelamin, id_kelas } = req.body
    try {
        const siswa = await Siswa.update({
            nisn, nama, tanggal_lahir, jenis_kelamin, id_kelas
        }, {
            where: {
                id: req.params.id
            }
        })
        if (siswa == 0) {
            res.status(404).json({ msg: "Data Tidak di temukan" })
        } else {
            res.json({ msg: "Data Berhasil Di Ubah" })
        }
    } catch (error) {
        console.log(error)
    }
}

export const hapusSiswa = async (req, res) => {
    try {
        const siswa = await Siswa.destroy({
            where: {
                id: req.params.id
            }
        })
        if (siswa === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Terhapus" })
    } catch (error) {
        console.log(error);
    }
}

