import Mapel from "../models/mapelModel.js";
import db from '../config/Database.js'


export const getMapel = async (req, res) => {
    try {
        const [mapel] = await db.query("SELECT m.id, m.kkm, m.idGuru, m.id_kelas, m.id_NMapel, n.nama,n.induk FROM mapel as m " +
            "INNER JOIN nama_mapel as n " +
            "on m.id_NMapel = n.id")
        res.json(mapel)
    } catch (error) {
        console.log(error)
    }
}

export const getMapelId = async (req, res) => {
    try {
        const [mapel] = await db.query("SELECT m.id, m.kkm, m.idGuru, m.id_kelas, m.id_NMapel, n.nama,n.induk FROM mapel as m " +
            "INNER JOIN nama_mapel as n " +
            `on m.id_NMapel = n.id WHERE m.id = ${req.params.id}`)
        if (mapel === null)
            res.status(404).json({ msg: "Data Kosong" })
        else
            res.json(mapel[0])
    } catch (error) {
        res.status(404).json({ msg: "Data Tidak di temukan" })
    }
}
export const getMapelKelas = async (req, res) => {
    try {
        const [mapel] = await db.query("SELECT m.id, m.kkm, m.idGuru, m.id_kelas, m.id_NMapel, n.nama,n.induk FROM mapel as m " +
            "INNER JOIN nama_mapel as n " +
            `on m.id_NMapel = n.id WHERE m.id_kelas = ${req.params.idKelas}`)

        const [nama] = await db.query("SELECT n.nama FROM mapel as m " +
            "INNER JOIN nama_mapel as n " +
            `on m.id_NMapel = n.id WHERE m.id_kelas = ${req.params.idKelas}`)

        const kkm = await db.query("SELECT m.kkm FROM mapel as m " +
            "INNER JOIN nama_mapel as n " +
            `on m.id_NMapel = n.id WHERE m.id_kelas = ${req.params.idKelas}`)


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
    const { kkm, idGuru, id_kelas, id_NMapel } = req.body
    try {
        const mapel = await Mapel.create({ kkm, idGuru, id_kelas, id_NMapel })

        if (mapel === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Ditambahkan" })

    } catch (error) {
        console.log(error);
    }
}

export const editMapel = async (req, res) => {
    const { kkm, idGuru, id_kelas, id_NMapel } = req.body
    const id = req.params.id

    try {
        const mapel = await Mapel.update({ kkm, idGuru, id_kelas, id_NMapel }, {
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