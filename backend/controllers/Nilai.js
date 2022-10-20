import Nilai from "../models/nilaiModel.js";

export const getNilai = async (req, res) => {
    try {
        const nilai = await Nilai.findAll({
            attributes: ['id', 'nilai', 'id_jenis_nilai']
        })
        res.json(nilai)
    } catch (error) {
        console.log(error)
    }
}

export const getNilaiId = async (req, res) => {
    try {
        const nilai = await Nilai.findOne({
            where: { id: req.params.id }
        })
        if (nilai === null)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json(nilai)
    } catch (error) {
        console.log(error)
    }
}

export const tambahNilai = async (req, res) => {
    const { nilai, id_jenis_nilai } = req.body

    try {
        const n = await Nilai.create({
            nilai, id_jenis_nilai
        })
        if (n === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Di Tambahkan" })
    } catch (error) {
        console.log(error);
    }
}

export const editNilai = async (req, res) => {
    const { nilai, id_jenis_nilai } = req.body
    try {
        const n = await Nilai.update({
            nilai, id_jenis_nilai
        }, {
            where: {
                id: req.params.id
            }
        })
        if (n === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Di Ubah" })
    } catch (error) {
        console.log(error);
    }
}

export const hapusNilai = async (req, res) => {
    try {
        const n = await Nilai.destroy({
            where: {
                id: req.params.id
            }
        })
        if (n === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Di Hapus" })
    } catch (error) {
        console.log(error);
    }
}