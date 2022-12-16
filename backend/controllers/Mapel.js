import Mapel from "../models/mapelModel.js";
import db from '../config/Database.js'


export const getMapel = async (req, res) => {
    try {
        const mapel = await Mapel.findAll({
            attributes: ['id', 'nama', 'induk', 'kkm', 'idGuru', 'id_kelas']
        })
        res.json(mapel)
    } catch (error) {
        console.log(error)
    }
}

export const getMapelId = async (req, res) => {
    try {
        const mapel = await Mapel.findOne({
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
export const getMapelKelas = async (req, res) => {
    try {
        const mapel = await Mapel.findAll({
            where: {
                id_kelas: req.params.idKelas
            }
        })
        const nama = await Mapel.findAll({
            attributes: ['nama'],
            where: {
                id_kelas: req.params.idKelas
            }
        })
        const kkm = await Mapel.findAll({
            attributes: ['kkm'],
            where: {
                id_kelas: req.params.idKelas
            }
        })
        if (mapel === null || nama === null || kkm === null)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        else
            res.json({ mapel, nama, kkm })
    } catch (error) {
        res.status(404).json({ msg: "Data Tidak di temukan" })
    }
}

export const getMapelRapor = async (req, res) => {
    try {
        const [results, metadata] = await db.query("SELECT m.nama, m.kkm, n.nilai_keterampilan,n.nilai,n.jenis_nilai " +
            "from mapel as m LEFT join nilai as n on m.id = n.id_mapel " +
            `WHERE m.id_kelas = ${req.params.idKelas} AND n.id_siswa = ${req.params.idSiswa}`
        )
        if (results === null)
            res.status(404).json({ msg: "Data Kosong" })
        else
            res.json(results)
    } catch (error) {
        res.status(404).json({ msg: `Data Tidak di temukan && ${error}` })
    }
}

export const tambahMapel = async (req, res) => {
    const { nama, induk, kkm, idGuru, id_kelas } = req.body
    try {
        const mapel = await Mapel.create({ nama, induk, kkm, idGuru, id_kelas })

        if (mapel === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Ditambahkan" })

    } catch (error) {
        console.log(error);
    }
}

export const editMapel = async (req, res) => {
    const { nama, induk, kkm, idGuru, id_kelas } = req.body
    const id = req.params.id

    try {
        const mapel = await Mapel.update({ nama, induk, kkm, idGuru, id_kelas }, {
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

export const hapusMapel = async (req, res) => {
    try {
        const mapel = await Mapel.destroy({ where: { id: req.params.id } })

        if (mapel === 1)
            res.json({ msg: "Data Berhasil Terhapus" })
        else
            res.status(404).json({ msg: "Data Tidak di temukan" })

    } catch (error) {
        console.log(error);
    }
}