import express from "express";
import { getUsers, Login, Logout, Register } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import * as guru from "../controllers/Gurus.js";
import * as kelas from "../controllers/Kelas.js";
import * as nilai from "../controllers/Nilai.js";
import * as siswa from "../controllers/Siswa.js";
import { getMapel, getMapelId, editMapel, hapusMapel, tambahMapel } from "../controllers/Mapel.js";
import * as wali from "../controllers/Wali.js";
import * as rapor from "../controllers/Rapor.js";

const router = express.Router()

// User
router.get('/users', verifyToken, getUsers)
router.post('/users', Register)
router.post('/login', Login)
router.get('/token', refreshToken)
router.delete('/logout', Logout)

// Guru
router.get('/guru', guru.getGurus)
router.get('/guru/:id', guru.getGurusId)
router.post('/guru', guru.tambahGuru)
router.put('/guru/:id', guru.editGuru)
router.delete('/guru/:id', guru.hapusGuru)

// Kelas
router.get('/kelas', kelas.getKelas)
router.get('/kelas/:id', kelas.getKelasId)
router.post('/kelas', kelas.tambahKelas)
router.put('/kelas/:id', kelas.editKelas)
router.delete('/kelas/:id', kelas.hapusKelas)

// Nilai
router.get('/nilai', nilai.getNilai)
router.get('/nilai/:id', nilai.getNilaiId)
router.post('/nilai', nilai.tambahNilai)
router.put('/nilai/:id', nilai.editNilai)
router.delete('/nilai/:id', nilai.hapusNilai)


// Siswa
router.get('/siswa', siswa.getSiswa)
router.get('/siswa/:id', siswa.getSiswaId)
router.post('/siswa', siswa.tambahSiswa)
router.put('/siswa/:id', siswa.editSiswa)
router.delete('/siswa/:id', siswa.hapusSiswa)


// Mapel
router.get('/mapel', verifyToken, getMapel)
// router.get('/mapel/:id', getMapelId)
router.post('/mapel', tambahMapel)
router.put('/mapel/:id', editMapel)
router.delete('/mapel/:id', hapusMapel)


// Wali
router.get('/wali', wali.getWali)
router.get('/wali/:id', wali.getWaliId)
router.post('/wali', wali.tambahWali)
router.put('/wali/:id', wali.editWali)
router.delete('/wali/:id', wali.hapusWali)


// Wali
router.get('/rapor', rapor.getRapor)
router.get('/rapor/:id', rapor.getRaporId)
router.post('/rapor', rapor.tambahRapor)
router.put('/rapor/:id', rapor.editRapor)
router.delete('/rapor/:id', rapor.hapusRapor)


export default router