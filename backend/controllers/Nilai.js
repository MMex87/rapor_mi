import Nilai from "../models/nilaiModel.js";
import db from "../config/Database.js"

export const getNilai = async (req, res) => {
    try {
        const [nilai] = await db.query("SELECT n.id, n.nilai, n.nilai_keterampilan, n.id_mapel, " +
            "n.id_siswa, n.id_rapor, r.jenis_rapor, r.semester, r.id_kelas, r.id_siswa " +
            "FROM nilai as n " +
            "INNER JOIN rapor as r " +
            "on n.id_rapor = r.id")
        res.json(nilai)
    } catch (error) {
        console.log(error)
    }
}

export const getNilaiId = async (req, res) => {
    try {
        const [nilai] = await db.query("SELECT n.id, n.nilai, n.nilai_keterampilan, n.id_mapel, " +
            "n.id_siswa, n.id_rapor, r.jenis_rapor, r.semester, r.id_kelas, r.id_siswa " +
            "FROM nilai as n " +
            "INNER JOIN rapor as r " +
            "on n.id_rapor = r.id " +
            `WHERE n.id = ${req.params.id}`)
        if (nilai === null)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json(nilai)
    } catch (error) {
        console.log(error)
    }
}
export const getNilaiIdSiswa = async (req, res) => {
    try {
        const [nilai] = await db.query("SELECT n.id, n.nilai, n.nilai_keterampilan, n.id_mapel, " +
            "n.id_siswa, n.id_rapor, r.jenis_rapor, r.semester, r.id_kelas, r.id_siswa " +
            "FROM nilai as n " +
            "INNER JOIN rapor as r " +
            "on n.id_rapor = r.id " +
            `WHERE r.id_siswa = ${req.params.idSiswa} AND ` +
            `r.id_kelas = ${req.params.idKelas}`)
        if (nilai === null)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json(nilai)
    } catch (error) {
        console.log(error)
    }
}

export const tambahNilai = async (req, res) => {
    const { nilai, nilai_keterampilan, id_mapel, id_siswa, id_rapor } = req.body

    try {
        const n = await Nilai.create({
            nilai, nilai_keterampilan
            , id_mapel, id_siswa, id_rapor
        })
        if (n === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Di Tambahkan" })
    } catch (error) {
        console.log(error);
    }
}

export const editNilai = async (req, res) => {
    const { nilai, nilai_keterampilan, id_mapel, id_siswa, id_rapor } = req.body
    try {
        const n = await Nilai.update({
            nilai, nilai_keterampilan
            , id_mapel, id_siswa, id_rapor
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