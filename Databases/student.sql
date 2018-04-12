-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 24, 2018 at 08:18 AM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `college`
--

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `enrollment_no` varchar(100) NOT NULL,
  `reg_no` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `dob` varchar(100) NOT NULL,
  `adm_yr` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`enrollment_no`),
  UNIQUE KEY `enrollment_no` (`enrollment_no`),
  UNIQUE KEY `reg_no` (`reg_no`),
  UNIQUE KEY `mail` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`enrollment_no`, `reg_no`, `name`, `dob`, `adm_yr`, `email`, `phone`, `password`) VALUES
('10401215072', '', 'RIYAN ROY', '2018-03-08', '2015', '', '9679482564', '12345'),
('10401215060', '1510410010060', 'Pallashree Coomer', '1996-03-23', '2015', 'p.coomer@gmail.com', '1234567891', '12345'),
('10401215061', '151041010061', 'Patralekha Mitra', '1996-09-24', '2015', 'pat.mitra@gmail.com', '1234567891', '12345'),
('10401215062', '1510410010062', 'Payel Mitra', '2018-03-16', '2015', 'p.mitra@gmail.com', '1234567891', '12345'),
('10401215063', '1510410010063', 'Priya Chitlangia', '2018-03-02', '2015', 'p.c@gmail.com', '1234567891', '12345'),
('10401215064', '1510410010064', 'Rahul Bose', '2018-03-03', '2015', 'r.b@gmail.com', '1234567891', '12345'),
('10401215065', '1510410010065', 'Raj Roy', '2018-03-10', '2015', 'r.r@gmail.com', '1234567891', '12345'),
('10401215066', '1510410010066', 'Ramchandra Pandit', '2018-03-09', '2015', 'r.c.p@gmail.com', '1234567891', '12345'),
('10401215067', '1510410010067', 'Rajdeep Dey', '2018-03-09', '2015', 'dey.rajdeep@gmail.com', '1234567891', '12345'),
('10401215068', '1510410010068', 'Rimi Pakhira', '2018-03-23', '2015', 'r.p@gmail.com', '1234567891', '12345'),
('10401215069', '1510410010069', 'Riya Guha Thakurta', '2018-03-15', '2015', 'rgt@gmail.com', '1234567891', '12345'),
('10401215070', '1510410010070', 'Poulami Ghosh', '2018-03-22', '2015', 'p.g@gmail.com', '1234567891', '12345'),
('104012150672', '1510410010072', 'Riyan Roy', '1996-07-06', '2015', 'riyanroy2@gmail.com', '9679482564', '12345'),
('10401215073', '1510410010073', 'Rohan Dutta', '2018-03-08', '2015', 'r.d@gmail.com', '1234567891', '12345'),
('10401215074', '1510410010074', 'Sabarni Sengupta', '2018-03-22', '2015', 's.s@gmail.com', '1234567891', '12345'),
('10401215075', '1510410010075', 'Sabreena Ahamed', '2018-03-15', '2015', 's.a@gmail.com', '1234567891', '12345'),
('10401215076', '1510410010076', 'Sachin Agarwal', '2018-03-08', '2015', 'sachinagarwal141@gmail.com', '8981235526', '12345'),
('10401215077', '1510410010077', 'Sagnik Banerjee', '2018-03-15', '2015', 's.b@gmail.com', '1234567891', '12345'),
('10401215078', '1510410010078', 'Sagnik Sarkar', '2018-03-15', '2015', 's.s.r@gmail.com', '1234567891', '12345'),
('10401215080', '1510410010080', 'Surbhi Kumari', '2018-03-15', '2015', 's.k@gmail.com', '1234567891', '12345'),
('10401215082', '1510410010082', 'Suman Kanrar', '2018-03-22', '2015', 'sumankanrar25@gmail.com', '1234567891', '12345'),
('10401215083', '1510410010083', 'Suman Chakraborty', '2018-03-22', '2015', 's.c@gmail.com', '1234567891', '12345'),
('10401215084', '1510410010084', 'Tanupriya Kundu', '2018-03-08', '2015', 't.k@gmail.com', '1234567891', '12345');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
