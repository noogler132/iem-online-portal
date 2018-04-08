-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 29, 2018 at 08:08 PM
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
-- Database: `iem`
--

-- --------------------------------------------------------

--
-- Table structure for table `student_auth`
--

DROP TABLE IF EXISTS `student_auth`;
CREATE TABLE IF NOT EXISTS `auth` (
  `u_id` bigint(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `as` varchar(3) NOT NULL,
  PRIMARY KEY (`u_roll`),
  UNIQUE KEY `u_roll` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student_auth`
--

INSERT INTO `student_auth` (`u_roll`, `email`, `password`) VALUES
(10401215111, 'abhik.bhowmick33@gmail.com', ''),
(10401215097, 'banerjee.shashpa@gmail.com', ''),
(10401215112, 'csuman203@gmail.com', ''),
(10401215068, 'dey.rajdeep72@gmail.com', ''),
(10401215089, 'golfingpower@gmail.com', ''),
(10401215070, 'pakhirarimi2014@gmail.com', ''),
(10401215060, 'pallashreecoomer97@gmail.com', ''),
(10401215061, 'pat.mitra@gmail.com', ''),
(10401215062, 'payelmitra131297@gmail.com', ''),
(10401215063, 'poulami1997ghosh@gmail.com', ''),
(10401215085, 'princedatta31@gmail.com', ''),
(10401215064, 'priyachitlangi@gmail.com', ''),
(10401215065, 'priyankasaha3011@gmail.com', ''),
(10401215067, 'rajroy.roy83@gmail.com', ''),
(10401215069, 'ramchandra2804@gmail.com', ''),
(10401215071, 'riyaguhat@gmail.com', ''),
(10401215072, 'riyanroy2@gmail.com', ''),
(10401215073, 'rohandutta9628@gmail.com', ''),
(10401215074, 'sabarni.sengupta97@gmail.com', ''),
(10401215075, 'sabreenarahman636@gmail.com', ''),
(10401215076, 'sachinagarwal132@gmail.com', ''),
(10401215098, 'sadida006.ahmed@gmail.com', ''),
(10401215079, 'salonigoswami4@gmail.com', ''),
(10401215080, 'samadritaganguly11@gmail.com', ''),
(10401215081, 'samyajitmukherjee.1@gmail.com', ''),
(10401215082, 'sancharifun@gmail.com', ''),
(10401215083, 'sanjanamondal1993@gmail.com', ''),
(10401215084, 'sanjoyghosk@gmail.com', ''),
(10401215086, 'saptarship40@gmail.com', ''),
(10401215088, 'sayanbose456@gmail.com', ''),
(10401215091, 'sayangta5@gmail.com', ''),
(10401215093, 'sayani.sg25@gmail.com', ''),
(10401215090, 'sayanmondal08@gmail.com', ''),
(10401215092, 'sayansaha986@gmail.com', ''),
(10401215094, 'sayantanimallick97@gmail.com', ''),
(10401215095, 'sayanti.acharya2014@gmail.com', ''),
(10401215066, 'setroy38@gmail.com', ''),
(10401215078, 'shaggy.sarkar96@gmail.com', ''),
(10401215099, 'shibambhatt96@gmail.com', ''),
(10401215100, 'shraddhakhemka97@gmail.com', ''),
(10401215096, 'shrmla.gha@gmail.com', ''),
(10401215102, 'shubhra1996nil@gmail.com', ''),
(10401215101, 'shubhranil_dutta@hotmail.com', ''),
(10401215115, 'sins.swarnajit@gmail.com', ''),
(10401215103, 'sohamsen1997@gmail.com', ''),
(10401215104, 'sohinimitul@gmail.com', ''),
(10401215105, 'souhardya.dutta.7@gmail.com', ''),
(10401215106, 'soumyasreebose@gmail.com', ''),
(10401215108, 'souvikd925@gmail.com', ''),
(10401215109, 'sreejabanerjee.sb@gmail.com', ''),
(10401215110, 'subhayannath3@gmail.com', ''),
(10401215113, 'sumankanrar25@gmail.com', ''),
(10401215114, 'surbhikapsime214@gmail.com', ''),
(10401215116, 'taniya.malakar2014@gmail.com', ''),
(10401215117, 'tanupriyakundu1996@gmail.com', ''),
(10401215087, 'tanusayak@gmail.com', ''),
(10401215107, 'tatansounak@gmail.com', ''),
(10401215118, 'trishachakraborty16@gmail.com', ''),
(10401215119, 'uddalak071@gmail.com', ''),
(10401215120, 'vinay.agarwal1268@gmail.com', '');

-- --------------------------------------------------------

--
-- Table structure for table `student_details`
--

DROP TABLE IF EXISTS `student_details`;
CREATE TABLE IF NOT EXISTS `student_details` (
  `u_roll` bigint(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `u_reg` bigint(12) NOT NULL,
  `f_name` varchar(20) NOT NULL,
  `l_name` varchar(20) NOT NULL,
  `dob` date NOT NULL,
  `dept` varchar(5) NOT NULL,
  `contact` bigint(10) NOT NULL,
   PRIMARY KEY `u_roll` (`u_roll`),
  KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student_details`
--

INSERT INTO `student_details` (`u_roll`, `email`, `u_reg`, `f_name`, `l_name`, `dob`, `dept`, `contact`) VALUES
(10401215076, 'sachinagarwal132@gmail.com', 151041010076, 'SACHIN', 'AGARWAL', '1996-09-14', 'BCA', 8981235526),
(10401215068, 'dey.rajdeep72@gmail.com', 151041010068, 'RAJDEEP', 'DEY', '1997-08-15', 'BCA', 7980655207),
(10401215072, 'riyanroy2@gmail.com', 151041010072, 'RIYAN', 'ROY', '1996-04-14', 'BCA', 9679482564),
(10401215113, 'sumankanrar25@gmail.com', 151041010113, 'SUMAN', 'KANRAR', '1997-10-15', 'BCA', 7003392833);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
