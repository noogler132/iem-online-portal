-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 07, 2018 at 06:44 PM
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
-- Table structure for table `online_test`
--

DROP TABLE IF EXISTS `test_questions`;
CREATE TABLE IF NOT EXISTS `test_questions` (
  `test_key` varchar(100) NOT NULL,
  `Q_no` varchar(10) NOT NULL,
  `Question` text NOT NULL,
  `Option1` text NOT NULL,
  `Option2` text NOT NULL,
  `Option3` text NOT NULL,
  `Option4` text NOT NULL,
  `Solution` text NOT NULL,
  `Remarks`  NOT NULL,

) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `online_test`
--

INSERT INTO `online_test` (`Q_no`, `Question`, `Option1`, `Option2`, `Option3`, `Option4`, `Solution`, `Remarks`, `subject_code`) VALUES
('', 'Is Suman Batman?', 'Yes', 'No', 'Cannot be determined', 'None of these', 'Yes', '', '101');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
