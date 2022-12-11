import Kelas from "../models/kelasModel.js";


export const getKelas = async (req, res) => {
    try {
        const kelas = await Kelas.findAll({
            attributes: ['id', 'kelas', 'nama_kelas', 'id_guru']
        })
        res.json(kelas)
    } catch (error) {
        console.log(error)
    }
}

export const getKelasId = async (req, res) => {
    try {
        const kelas = await Kelas.findOne({
            where: { id: req.params.id }
        })
        if (kelas === null)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        else
            res.json(kelas)


    } catch (error) {
        res.status(404).json({ msg: "Data Tidak di temukan" })
    }
}

export const tambahKelas = async (req, res) => {
    const { kelas, nama_kelas, id_guru } = req.body
    try {
        await Kelas.create({ kelas, nama_kelas, id_guru })

        res.json({ msg: "Data Berhasil Di Tambahakan" })
    } catch (error) {
        console.log(error);
    }
}

export const editKelas = async (req, res) => {
    const { kelas, nama_kelas, id_guru } = req.body
    const id = req.params.id

    try {
        const kel = await Kelas.update({
            kelas, nama_kelas
            , id_guru
        }, {
            where: {
                id
            }
        })
        if (kel == 1)
            res.json({ msg: "Data Berhasil Di Ubah" })
        else
            res.status(404).json({ msg: "Data Tidak di temukan" })

        // res.json(kelas)
    } catch (error) {
        console.log(error);
    }
}

export const hapusKelas = async (req, res) => {
    try {
        const kelas = await Kelas.destroy({ where: { id: req.params.id } })

        if (kelas === 1)
            res.json({ msg: "Data Berhasil Terhapus" })
        else
            res.status(404).json({ msg: "Data Tidak di temukan" })

    } catch (error) {
        console.log(error);
    }
}