-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2018 at 04:08 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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

CREATE TABLE `student` (
  `enr_no` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `dob` varchar(100) NOT NULL,
  `adm_yr` varchar(100) NOT NULL,
  `phn` varchar(100) NOT NULL,
  `pass` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`enr_no`, `name`, `dob`, `adm_yr`, `phn`, `pass`) VALUES
('10401215072', 'Riyan Roy', '2018-03-14', '2015', '967982564', '12345'),
('12015004006170', 'SAGNIK BANERJEE', '1996-02-12', '2015', '825437349', '12345'),
('12015004006108', 'SUMAN CHAKRABORTI', '1996-01-19', '2015', '8928635490', '12345'),
('12015004006108=9', 'SAYAN SAHA', '1996-12-08', '2015', '8972543341', '12345'),
('12015004006110', 'SAMADRITA GANGULY', '1996-08-29', '2015', '9087652367', '12345'),
('12015004006111', 'SAYAK SAHA', '1996-04-03', '2015', '8905412422', '12345'),
('12015004006112', 'SANCHARI CHAKRABORTI', '1996-10-29', '2015', '9843278950', '12345'),
('12015004006113', 'SOUHARDYA DUTTA', '1996-04-18', '2015', '9856432095', '12345'),
('12015004006113', 'TRISHA CHAKRABARTI', '1996-10-22', '2015', '8976345421', '12345'),
('12015004006114', 'UDDALOK CHOWDHURY', '1996-10-21', '2015', '8933249812', '12345'),
('12015004006115', 'SACHIN AGARWAL', '1996-09-02', '2015', '9832400749', '12345');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
