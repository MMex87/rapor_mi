-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2022 at 11:45 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_rapor`
--

-- --------------------------------------------------------

--
-- Table structure for table `guru`
--

CREATE TABLE `guru` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `jtm` varchar(255) DEFAULT NULL,
  `nuptk` varchar(255) DEFAULT NULL,
  `pendidikan` varchar(255) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jenis_kelamin` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `role` varchar(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `guru`
--

INSERT INTO `guru` (`id`, `nama`, `username`, `password`, `refresh_token`, `jtm`, `nuptk`, `pendidikan`, `tanggal_lahir`, `jenis_kelamin`, `picture`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Pak Rofiq', 'PakRofiq', '$2b$10$Pj9CxvwFI7NTtrV4zogfm.GpuVq6CdN2IsereLM2125s4Q6VS0j3.', NULL, '6', '56756756746456', 'S1', '1998-03-22', 'Laki-Laki', 'default.png', 'Wali Kelas', '2022-10-04 13:37:39', '2022-12-08 07:59:36'),
(5, 'Bu ida', 'Buida', '$2b$10$fdddM8uXZ4F0csOgzIwpTeVMHmgFifD4z7X9F8C5tJIM3TJB1IsHC', NULL, '10', '567567558565', 'S1', '1998-03-22', 'Perempuan', 'default.png', 'Guru', '2022-10-06 06:17:04', '2022-12-07 19:37:02'),
(35, 'Bu Lilik', 'BuLilik', '$2b$10$.Anwlax/IKKbYf1yyeszfOZw.kWHCbNVWB3XzoZshEM3ninmqq24u', NULL, '2', '34222433', 'S1', '1972-01-05', 'Perempuan', 'default.png', 'Wali Kelas', '2022-11-26 05:43:09', '2022-12-05 06:25:22'),
(36, 'Pak Hasan', 'PakHasan', '$2b$10$4.d3d0bRWurzPB5Nr7k.eeIrP9xlGaU6gH9JlgRlFT1QumescJoze', NULL, '2', '2334222432423', 'S1', '1985-02-02', 'Laki-Laki', 'default.png', 'Wali Kelas', '2022-11-26 05:44:03', '2022-12-05 08:54:44'),
(37, 'Pak Jamil', 'PakJamil', '$2b$10$XBoUo.JcKJfOAVUBJLTIwuhCdEmXh7nEpVK0hlJAfwz/tXsGQl.6G', NULL, '6', '2435252345234', 'S1', '1972-02-02', 'Laki-Laki', '1670178171285-134968103.png', 'Wali Kelas', '2022-11-26 05:47:45', '2022-12-06 21:00:23'),
(38, 'Pak Tamim', 'PakTamim', '$2b$10$Zg6Lh6.b7LOI8Vi5k0T/JentB/b/xIA64jxoFJfrFR8TRDV21LNau', NULL, '4', '522342342', 'S1', '1966-12-12', 'Laki-Laki', 'default.png', 'Wali Kelas', '2022-11-26 05:50:38', '2022-12-06 21:00:31'),
(61, 'Ezekiel Simon', NULL, NULL, NULL, '2', '73', 'Qui totam qui pariat', '1976-03-09', 'Laki-Laki', 'default.png', 'Guru', '2022-12-04 20:07:12', '2022-12-07 19:32:03'),
(73, 'Katelyn Duffy', NULL, NULL, NULL, '0', '88', 'Blanditiis enim quae', '2021-06-14', 'Laki-Laki', 'default.png', 'Guru', '2022-12-05 06:25:13', '2022-12-05 06:28:04'),
(74, 'Bradley Terry', NULL, NULL, NULL, '0', '24', 'Molestiae pariatur ', '1990-01-02', 'Laki-Laki', 'default.png', 'Guru', '2022-12-05 10:08:46', '2022-12-05 10:11:21'),
(76, 'Tana Herman', NULL, NULL, NULL, '0', '47', 'Voluptate quia labor', '1996-08-08', 'Perempuan', 'default.png', 'Guru', '2022-12-07 19:30:39', '2022-12-07 19:36:14');

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `id` int(11) NOT NULL,
  `nama_kelas` varchar(255) DEFAULT NULL,
  `id_guru` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`id`, `nama_kelas`, `id_guru`, `createdAt`, `updatedAt`) VALUES
(1, '2C', 1, '2022-10-05 16:31:58', '2022-11-26 06:19:20'),
(2, '2B', 5, '2022-10-05 16:53:15', '2022-12-07 19:37:02'),
(7, '6C', 37, '2022-10-06 03:49:20', '2022-11-26 14:47:18'),
(8, '1A', 35, '2022-10-06 04:11:45', '2022-11-26 14:47:28'),
(9, '4A', 38, '2022-11-11 21:36:02', '2022-11-26 14:38:29'),
(10, '1A', 36, '2022-11-14 05:38:24', '2022-11-26 12:00:32');

-- --------------------------------------------------------

--
-- Table structure for table `mapel`
--

CREATE TABLE `mapel` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `induk` varchar(255) DEFAULT NULL,
  `kkm` varchar(11) NOT NULL,
  `idGuru` int(11) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mapel`
--

INSERT INTO `mapel` (`id`, `nama`, `induk`, `kkm`, `idGuru`, `id_kelas`, `createdAt`, `updatedAt`) VALUES
(9, 'Bahasa Indonesia', 'Muatan Lokal', '70', 1, 2, '2022-11-02 11:01:34', '2022-11-02 11:01:34'),
(16, 'matematika', 'national', '70', 5, 7, '2022-11-03 18:16:05', '2022-11-03 18:16:05'),
(20, 'Matematika', 'Muatan Lokal', '70', 5, 8, '2022-11-03 17:23:21', '2022-11-03 17:23:21'),
(21, 'IPA', 'National', '70', 1, 1, '2022-11-03 18:21:09', '2022-11-05 10:15:11'),
(26, 'Bahasa Indonesia', 'Muatan Lokal', '70', 5, 9, '2022-11-15 14:35:36', '2022-11-15 14:35:36'),
(28, 'Bahasa Indonesia', 'National', '70', 5, 10, '2022-11-16 05:38:47', '2022-11-16 05:38:47'),
(42, 'Matematika', 'National', '70', 1, 7, '2022-11-16 05:42:11', '2022-11-16 05:42:11'),
(45, 'Bahasa Indonesia', 'National', '70', 5, 7, '2022-11-16 05:46:55', '2022-12-06 19:04:04'),
(76, 'Bahasa Arab', 'National', '70', 36, 7, '2022-11-28 04:58:05', '2022-12-06 19:04:10'),
(87, 'Bahasa Arab', 'National', '70', 38, 2, '2022-11-28 05:40:15', '2022-12-06 19:03:50'),
(88, 'Bahasa Arab', 'Muatan Lokal', '71', 37, 1, '2022-11-28 05:40:22', '2022-12-06 19:03:18'),
(89, 'IPA', 'National', '70', 37, 8, '2022-11-28 14:43:27', '2022-12-06 19:04:16'),
(90, 'IPA', 'Muatan Lokal', '70', 36, 9, '2022-11-28 14:43:36', '2022-12-06 19:04:21'),
(91, 'IPA', 'Muatan Lokal', '70', 35, 1, '2022-11-28 14:43:43', '2022-12-06 19:03:38'),
(93, 'Bahasa Arab', 'National', '70', 38, 10, '2022-12-05 06:47:04', '2022-12-06 19:04:27'),
(95, 'Bahasa Jawa', 'National', '70', 61, 1, '2022-12-05 10:12:54', '2022-12-06 19:03:43'),
(96, 'IPA', 'National', '70', 37, 2, '2022-12-06 19:03:58', '2022-12-06 19:03:58');

-- --------------------------------------------------------

--
-- Table structure for table `nilai`
--

CREATE TABLE `nilai` (
  `id` int(11) NOT NULL,
  `nilai` int(11) DEFAULT NULL,
  `jenis_nilai` varchar(255) NOT NULL,
  `id_siswa` int(11) NOT NULL,
  `id_mapel` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nilai`
--

INSERT INTO `nilai` (`id`, `nilai`, `jenis_nilai`, `id_siswa`, `id_mapel`, `createdAt`, `updatedAt`) VALUES
(5, 91, 'UAS Ganjil', 41, 26, '2022-11-29 09:32:16', '2022-11-29 09:32:16'),
(14, 80, 'UAS Ganjil', 40, 26, '2022-11-30 16:17:48', '2022-11-30 16:17:48'),
(16, 40, 'UAS Ganjil', 43, 20, '2022-11-30 16:18:43', '2022-11-30 17:36:11'),
(19, 27, 'UAS Ganjil', 45, 20, '2022-11-30 16:20:45', '2022-11-30 17:26:04'),
(20, 30, 'UAS Ganjil', 42, 45, '2022-11-30 16:21:03', '2022-11-30 16:21:03'),
(21, 10, 'UAS Ganjil', 44, 45, '2022-11-30 16:21:09', '2022-11-30 16:21:09'),
(27, 100, 'UAS Ganjil', 42, 16, '2022-11-30 17:36:22', '2022-11-30 17:36:22'),
(28, 45, 'UAS Genap', 34, 28, '2022-11-30 18:15:01', '2022-11-30 18:20:20'),
(30, 44, 'UAS Genap', 44, 16, '2022-11-30 18:15:26', '2022-11-30 18:15:26'),
(31, 55, 'UTS Ganjil', 34, 28, '2022-11-30 18:19:59', '2022-11-30 18:20:04'),
(32, 20, 'UAS Ganjil', 34, 28, '2022-11-30 18:20:14', '2022-11-30 18:20:14'),
(33, 95, 'UTS Genap', 34, 28, '2022-11-30 18:22:25', '2022-11-30 18:22:29'),
(34, 88, 'UAS Ganjil', 3, 9, '2022-12-01 08:32:22', '2022-12-07 20:03:50'),
(35, 81, 'UAS Ganjil', 35, 9, '2022-12-01 09:07:43', '2022-12-01 09:07:43'),
(37, 93, 'UTS Genap', 38, 21, '2022-12-01 12:41:00', '2022-12-05 10:04:46'),
(38, 80, 'UAS Ganjil', 46, 28, '2022-12-05 09:14:51', '2022-12-05 09:14:58'),
(39, 89, 'UAS Ganjil', 36, 9, '2022-12-05 09:48:21', '2022-12-05 09:50:31'),
(43, 99, 'UAS Ganjil', 39, 9, '2022-12-05 09:49:44', '2022-12-05 09:49:44'),
(44, 90, 'UAS Ganjil', 1, 21, '2022-12-05 09:50:43', '2022-12-05 09:50:43'),
(45, 97, 'UAS Ganjil', 37, 21, '2022-12-05 09:50:55', '2022-12-05 09:50:55'),
(49, 77, 'UAS Ganjil', 38, 21, '2022-12-05 09:58:45', '2022-12-05 09:59:18'),
(50, 78, 'UAS Ganjil', 47, 21, '2022-12-05 09:59:10', '2022-12-05 09:59:10'),
(51, 29, 'UAS Genap', 1, 21, '2022-12-05 10:01:33', '2022-12-05 10:01:37'),
(52, 68, 'UAS Genap', 37, 21, '2022-12-05 10:01:50', '2022-12-05 10:01:55'),
(53, 77, 'UTS Ganjil', 1, 21, '2022-12-05 10:03:05', '2022-12-05 10:03:12'),
(54, 88, 'UTS Ganjil', 37, 21, '2022-12-05 10:03:15', '2022-12-05 10:03:15'),
(57, 98, 'UTS Genap', 37, 21, '2022-12-05 10:04:34', '2022-12-05 10:04:40'),
(58, 77, 'UAS Ganjil', 1, 88, '2022-12-05 21:26:34', '2022-12-05 21:26:34'),
(59, 90, 'UAS Ganjil', 42, 42, '2022-12-06 19:08:10', '2022-12-06 19:08:10'),
(60, 80, 'UAS Ganjil', 44, 42, '2022-12-06 19:13:24', '2022-12-06 19:13:24');

-- --------------------------------------------------------

--
-- Table structure for table `rapor`
--

CREATE TABLE `rapor` (
  `id` int(11) NOT NULL,
  `angkatan` varchar(255) DEFAULT NULL,
  `semester` varchar(255) DEFAULT NULL,
  `id_siswa` int(11) DEFAULT NULL,
  `id_kelas` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rapor`
--

INSERT INTO `rapor` (`id`, `angkatan`, `semester`, `id_siswa`, `id_kelas`, `createdAt`, `updatedAt`) VALUES
(3, '2022', 'Genap', 1, 1, '2022-12-02 17:46:21', '2022-12-02 17:46:21'),
(4, '2022/2023', 'Ganjil', 37, 1, '2022-12-06 20:27:31', '2022-12-06 20:27:31');

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE `siswa` (
  `id` int(11) NOT NULL,
  `nisn` varchar(255) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jenis_kelamin` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `id_kelas` int(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `siswa`
--

INSERT INTO `siswa` (`id`, `nisn`, `nama`, `tanggal_lahir`, `jenis_kelamin`, `status`, `id_kelas`, `createdAt`, `updatedAt`) VALUES
(1, '452342341234', 'Yerico', '2005-05-05', 'Laki-Laki', 'aktiv', 1, '2022-10-06 07:44:03', '2022-11-05 10:17:14'),
(3, '452342341234', 'bayu', '2004-04-04', 'Laki-Laki', 'aktiv', 2, '2022-10-06 07:45:14', '2022-11-05 09:42:30'),
(34, '54', 'Colin Summers', '1975-10-18', 'Laki-Laki', 'aktiv', 10, '2022-11-16 05:49:31', '2022-11-16 05:49:31'),
(35, '24', 'Marshall Benton', '2008-03-28', 'Laki-Laki', 'aktiv', 2, '2022-11-16 05:49:44', '2022-11-16 05:49:44'),
(36, '98', 'Mira Crane', '1999-03-06', 'Laki-Laki', 'aktiv', 2, '2022-11-16 05:49:51', '2022-11-26 05:45:16'),
(37, '62', 'Kennan Cohen', '1989-06-16', 'Laki-Laki', 'aktiv', 1, '2022-11-16 05:49:58', '2022-11-16 05:49:58'),
(38, '55', 'Ray Fowler', '2022-10-25', 'Perempuan', 'aktiv', 1, '2022-11-16 05:50:02', '2022-11-16 05:50:02'),
(39, '17545645', 'Malachi Donaldson', '1998-10-14', 'Laki-Laki', 'aktiv', 2, '2022-11-17 07:12:06', '2022-11-17 07:12:22'),
(40, '96', 'Aiko Chaney', '2015-08-20', 'Laki-Laki', 'aktiv', 9, '2022-11-28 14:44:50', '2022-11-28 14:44:50'),
(41, '18', 'Jana Fleming', '1970-10-22', 'Perempuan', 'aktiv', 9, '2022-11-28 14:45:06', '2022-11-28 14:45:06'),
(42, '34', 'Alfreda Mathis', '2000-03-21', 'Laki-Laki', 'aktiv', 7, '2022-11-28 14:45:13', '2022-11-28 14:45:13'),
(43, '58', 'Uriel Cardenas', '2008-10-09', 'Perempuan', 'aktiv', 8, '2022-11-28 14:45:22', '2022-11-28 14:45:22'),
(44, '73', 'Amity Herrera', '1982-07-12', 'Perempuan', 'aktiv', 7, '2022-11-28 14:45:32', '2022-11-28 14:45:32'),
(45, '62', 'Daniel Luna', '1991-01-25', 'Laki-Laki', 'aktiv', 8, '2022-11-28 14:45:40', '2022-11-28 14:45:40'),
(46, '47', 'Kyla Becker', '2007-01-04', 'Laki-Laki', 'aktiv', 10, '2022-11-28 14:45:59', '2022-11-28 14:45:59'),
(47, '80', 'Wanda Burns', '1981-01-06', 'Perempuan', 'aktiv', 1, '2022-11-28 14:46:04', '2022-11-28 14:46:04'),
(51, '61', 'Lyle Price', '1974-11-11', 'Laki-Laki', 'aktiv', 10, '2022-12-07 19:18:09', '2022-12-07 19:18:09');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `picture` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `role`, `picture`, `createdAt`, `updatedAt`) VALUES
(1, 'Okky Setya Kurniawan', 'okkysetya87@gmail.com', '$2b$10$HBGNHB2PwSA5uuR0ircJMOi4yzfno2gs6QdZUC6GnK42tJkyGta7y', NULL, 'Admin', 'default.png', '2022-09-21 12:36:42', '2022-12-07 19:57:51'),
(2, 'YERICO AGUNG KRISTANTO', 'Yerico@gmail.com', '$2b$10$82IxNS0hUQ47C5huf5t/3.QzBVPH1yOG1Plp0pJAHT2bhhSJNOnnK', NULL, 'Admin', 'default.png', '2022-10-03 00:32:32', '2022-12-06 20:59:45'),
(3, 'okky', 'okkysetya@gmail.com', '$2b$10$fx6guNVCB4Qx6AmzDDcmbOjEqo7VhGZx83qEEiZrp5g.R1zQS/VKm', NULL, 'Admin', 'default.png', '2022-10-20 12:48:33', '2022-11-23 03:17:41'),
(4, 'Zaid Muhammad', 'zaid@gmail.com', '$2b$10$jJSF6DClgwSsvvGYQ6HbGu3ZslmpGs37aVGayCgj0ZcrGd36UTd12', NULL, 'Admin', '1668519956282-962704633.jpg', '2022-11-15 13:47:18', '2022-11-25 14:00:41'),
(5, 'ANDY AYUB LASKANUGRAHA', 'alan@gmail.com', '$2b$10$MYYrRu6ChwkNZ/Ursm3YC.dYRjPxRFfN9fB/.B37e9vbIKmJ0jNXa', NULL, 'Admin', '1668521943546-204534868.jpg', '2022-11-15 14:19:11', '2022-11-19 13:16:20'),
(15, 'nyambek', 'nyambek@gmail.com', '$2b$10$Pi/C1v59u4zbX4n2waL/Quqa4m1eqBvd1CvpBFs.0aOoIr8/ZHouu', NULL, 'Admin', '1669165622722-600018615.jpg', '2022-11-23 01:07:22', '2022-11-23 13:45:09'),
(23, 'Zaid Anwar', 'ZaidAN@gmail.com', '$2b$10$2MPkkMIJvNegeMs0mTk3Tu8MifzVZivTrHYPjTw4eVWcc2sZFdNya', NULL, 'Admin', 'default.png', '2022-12-03 21:44:34', '2022-12-03 21:46:51'),
(29, 'PakZain', 'pakZain@gmail.com', '$2b$10$6IjUFqkO7H40wqZs3Z2AtedCXWijHy6/yju3w7/DhQBvvjsLa9FZq', NULL, 'Kepala Sekolah', 'default.png', '2022-12-05 08:37:08', '2022-12-05 08:37:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `guru`
--
ALTER TABLE `guru`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_guru` (`id_guru`);

--
-- Indexes for table `mapel`
--
ALTER TABLE `mapel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_guru` (`idGuru`),
  ADD KEY `id_kelas` (`id_kelas`);

--
-- Indexes for table `nilai`
--
ALTER TABLE `nilai`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_mapel` (`id_mapel`),
  ADD KEY `id_siswa` (`id_siswa`);

--
-- Indexes for table `rapor`
--
ALTER TABLE `rapor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rapor_id_siswa` (`id_siswa`),
  ADD KEY `rapor_id_kelas` (`id_kelas`);

--
-- Indexes for table `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_kelas` (`id_kelas`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `guru`
--
ALTER TABLE `guru`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `mapel`
--
ALTER TABLE `mapel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `nilai`
--
ALTER TABLE `nilai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `rapor`
--
ALTER TABLE `rapor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `siswa`
--
ALTER TABLE `siswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kelas`
--
ALTER TABLE `kelas`
  ADD CONSTRAINT `kelas_ibfk_1` FOREIGN KEY (`id_guru`) REFERENCES `guru` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `mapel`
--
ALTER TABLE `mapel`
  ADD CONSTRAINT `mapel_ibfk_1` FOREIGN KEY (`idGuru`) REFERENCES `guru` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mapel_ibfk_2` FOREIGN KEY (`id_kelas`) REFERENCES `kelas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `nilai`
--
ALTER TABLE `nilai`
  ADD CONSTRAINT `nilai_ibfk_1` FOREIGN KEY (`id_siswa`) REFERENCES `siswa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nilai_ibfk_2` FOREIGN KEY (`id_mapel`) REFERENCES `mapel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rapor`
--
ALTER TABLE `rapor`
  ADD CONSTRAINT `rapor_ibfk_1` FOREIGN KEY (`id_siswa`) REFERENCES `siswa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rapor_ibfk_2` FOREIGN KEY (`id_kelas`) REFERENCES `kelas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `siswa`
--
ALTER TABLE `siswa`
  ADD CONSTRAINT `siswa_ibfk_1` FOREIGN KEY (`id_kelas`) REFERENCES `kelas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
