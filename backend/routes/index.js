import express from "express";
import { DeleteUser, getSuper, getUsers, getUsersId, Login, Logout, Register, UpdateUser } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken, refreshTokenGuru } from "../controllers/RefreshToken.js";
import * as guru from "../controllers/Gurus.js";
import * as kelas from "../controllers/Kelas.js";
import * as nilai from "../controllers/Nilai.js";
import * as siswa from "../controllers/Siswa.js";
import { getMapel, getMapelId, editMapel, hapusMapel, tambahMapel, getMapelKelas, getMapelRapor } from "../controllers/Mapel.js";
import * as rapor from "../controllers/Rapor.js";

const router = express.Router()

// User
router.get('/users', verifyToken, getUsers)
router.get('/users/:id', verifyToken, getUsersId)
router.get('/users/super/:super', getSuper)
router.put('/users/:id', UpdateUser)
router.post('/users', Register)
router.delete('/users/:id', DeleteUser)
router.post('/login', Login)
router.get('/token', refreshToken)
router.delete('/logout', Logout)

// Guru
router.get('/guru', verifyToken, guru.getGurus)
router.get('/guru/:id', verifyToken, guru.getGurusId)
router.get('/guru/nama/:nama', verifyToken, guru.getGurusName)
router.post('/guru', guru.TambahGuru)
router.put('/guru/:id', guru.editGuru)
router.put('/guruUpdate/:id', guru.updateGuru)
router.put('/guruRole/:id', guru.editGuruRole)
router.delete('/guru/:id', guru.hapusGuru)
router.get('/tokenGuru', refreshTokenGuru)
router.post('/loginGuru', guru.Login)
router.delete('/logoutGuru', guru.Logout)

// Kelas
router.get('/kelas', verifyToken, kelas.getKelas)
router.get('/kelas/:id', verifyToken, kelas.getKelasId)
router.post('/kelas', kelas.tambahKelas)
router.put('/kelas/:id', kelas.editKelas)
router.delete('/kelas/:id', kelas.hapusKelas)

// Nilai
router.get('/nilai', verifyToken, nilai.getNilai)
router.get('/nilai/:id', verifyToken, nilai.getNilaiId)
router.post('/nilai', nilai.tambahNilai)
router.put('/nilai/:id', nilai.editNilai)
router.delete('/nilai/:id', nilai.hapusNilai)

// Siswa
router.get('/siswa', verifyToken, siswa.getSiswa)
router.get('/siswa/:id', verifyToken, siswa.getSiswaId)
router.post('/siswa', siswa.tambahSiswa)
router.put('/siswa/:id', siswa.editSiswa)
router.delete('/siswa/:id', siswa.hapusSiswa)

// Mapel
router.get('/mapel', verifyToken, getMapel)
router.get('/mapel/:id', verifyToken, getMapelId)
router.get('/mapelKelas/:idKelas', verifyToken, getMapelKelas)
router.get('/mapelRapor/:idKelas/:idSiswa', verifyToken, getMapelRapor)
router.post('/mapel', tambahMapel)
router.put('/mapel/:id', editMapel)
router.delete('/mapel/:id', hapusMapel)

// Rapor
router.get('/rapor', verifyToken, rapor.getRapor)
router.get('/rapor/:id', verifyToken, rapor.getRaporId)
router.get('/rapor/:idKelas/:idSiswa', verifyToken, rapor.getRaporIdSiswa)
router.post('/rapor', rapor.tambahRapor)
router.put('/rapor/:id', rapor.editRapor)
router.delete('/rapor/:id', rapor.hapusRapor)

export default router