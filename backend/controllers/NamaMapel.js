import NamaMapel from "../models/namaMapelModel.js";
import db from "../config/Database.js"


export const getNamaMapel = async (req, res) => {
    try {
        const mapel = await NamaMapel.findAll({
            attributes: ['id', 'nama', 'induk']
        })
        res.json(mapel)
    } catch (error) {
        console.log(error)
    }
}

export const getNamaMapelId = async (req, res) => {
    try {
        const mapel = await NamaMapel.findOne({
            where: { id: req.params.id }
        })
        if (mapel === null)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        else
            res.json(mapel)
    } catch (error) {
        res.status(404).json({ msg: "Data Tidak di temukan" })
    }
}
export const getNamaMapelNama = async (req, res) => {
    try {
        const mapel = await NamaMapel.findOne({
            where: { nama: req.params.nama }
        })
        if (mapel === null)
            res.status(404).json({ msg: "Data Kosong" })
        else
            res.json(mapel)
    } catch (error) {
        res.status(404).json({ msg: "Gagal Memuat Data" })
    }
}

export const tambahNamaMapel = async (req, res) => {
    const { nama, induk } = req.body
    try {
        const mapel = await NamaMapel.create({ nama, induk })

        if (mapel === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Ditambahkan" })

    } catch (error) {
        console.log(error);
    }
}

export const editNamaMapel = async (req, res) => {
    const { nama, induk } = req.body
    const id = req.params.id

    try {
        const mapel = await NamaMapel.update({ nama, induk }, {
            where: {
                id
            }
        })
        if (mapel == 1)
            res.json({ msg: "Data Berhasil Di Ubah" })
        else
            res.status(404).json({ msg: "Data Tidak di temukan" })

        // res.json(mapel)
    } catch (error) {
        console.log(error);
    }
}

export const hapusNamaMapel = async (req, res) => {
    try {
        const mapel = await NamaMapel.destroy({ where: { id: req.params.id } });

        if (mapel === 1)
            res.json({ msg: "Data Berhasil Terhapus" })
        else
            res.status(404).json({ msg: "Data Tidak di temukan" })

    } catch (error) {
        console.log(error);
    }
}