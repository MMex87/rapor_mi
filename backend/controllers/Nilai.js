import Nilai from "../models/nilaiModel.js";

export const getNilai = async (req, res) => {
    try {
        const nilai = await Nilai.findAll({
            attributes: ['id', 'nilai', 'nilai_keterampilan', 'jenis_nilai', 'id_mapel', 'id_siswa']
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
    const { nilai, nilai_keterampilan, jenis_nilai, id_mapel, id_siswa } = req.body

    try {
        const n = await Nilai.create({
            nilai, nilai_keterampilan, jenis_nilai
            , id_mapel, id_siswa
        })
        if (n === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Di Tambahkan" })
    } catch (error) {
        console.log(error);
    }
}

export const editNilai = async (req, res) => {
    const { nilai, nilai_keterampilan, jenis_nilai, id_mapel, id_siswa } = req.body
    try {
        const n = await Nilai.update({
            nilai, nilai_keterampilan, jenis_nilai
            , id_mapel, id_siswa
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