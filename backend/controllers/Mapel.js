import Mapel from "../models/mapelModel.js";


export const getMapel = async (req, res) => {
    try {
        const mapel = await Mapel.findAll({
            attributes: ['id', 'nama', 'induk']
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

export const tambahMapel = async (req, res) => {
    const { nama, induk, id_nilai } = req.body
    try {
        const mapel = await Mapel.create({ nama, induk, id_nilai })

        if (mapel === 0)
            res.status(404).json({ msg: "Data Tidak di temukan" })
        res.json({ msg: "Data Berhasil Ditambahkan" })

    } catch (error) {
        console.log(error);
    }
}

export const editMapel = async (req, res) => {
    const { nama, induk, id_nilai } = req.body
    const id = req.params.id

    try {
        const mapel = await Mapel.update({ nama, induk, id_nilai }, {
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